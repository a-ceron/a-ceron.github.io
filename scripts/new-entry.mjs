import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { dirname, resolve } from 'node:path';

const types = {
	blog: 'blog',
	project: 'projects',
	newsletter: 'newsletter',
};

const type = process.argv[2];

if (!Object.hasOwn(types, type)) {
	console.error('Uso: node scripts/new-entry.mjs <blog|project|newsletter> [slug]');
	process.exit(1);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDirectory = resolve(root, 'src/content', types[type]);
const readLine = createInterface({ input: stdin, output: stdout });

function slugify(value) {
	return value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

function yamlString(value) {
	return JSON.stringify(value);
}

function localDate() {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	return `${now.getFullYear()}-${month}-${day}`;
}

function isValidDate(value) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return false;
	}

	const date = new Date(`${value}T00:00:00Z`);
	return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function isGithubRepository(value) {
	return /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?\/?$/.test(value);
}

async function ask(question) {
	return (await readLine.question(question)).trim();
}

async function required(question) {
	const answer = await ask(question);
	if (!answer) {
		throw new Error('Este campo es obligatorio.');
	}
	return answer;
}

async function main() {
	const title = await required('Título: ');
	const description = await required('Descripción breve: ');
	const rawSlug = process.argv[3] || title;
	const slug = slugify(rawSlug);

	if (!slug) {
		throw new Error('No se pudo crear un slug válido a partir del título.');
	}

	const dateInput = await ask(`Fecha de publicación [${localDate()}]: `);
	const pubDate = dateInput || localDate();
	if (!isValidDate(pubDate)) {
		throw new Error('La fecha debe tener formato YYYY-MM-DD y ser válida.');
	}

	const tagsInput = await ask('Etiquetas separadas por coma (opcional): ');
	const tags = tagsInput
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);
	const heroImage = await ask('Ruta de portada relativa a este archivo (opcional): ');

	const fields = [
		`title: ${yamlString(title)}`,
		`description: ${yamlString(description)}`,
		`pubDate: ${yamlString(pubDate)}`,
		`tags: [${tags.map(yamlString).join(', ')}]`,
	];

	if (heroImage) {
		fields.push(`heroImage: ${yamlString(heroImage)}`);
	}

	if (type === 'blog') {
		fields.push('draft: false');
	}

	if (type === 'project') {
		const repositoryUrl = await required('URL del repositorio GitHub (HTTPS): ');
		if (!isGithubRepository(repositoryUrl)) {
			throw new Error('Usa un enlace HTTPS con formato https://github.com/usuario/repositorio.');
		}

		const statusInput = await ask('Estado [active/completed/archived] (active): ');
		const status = statusInput || 'active';
		if (!['active', 'completed', 'archived'].includes(status)) {
			throw new Error('El estado debe ser active, completed o archived.');
		}
		fields.push(`repositoryUrl: ${yamlString(repositoryUrl)}`);
		fields.push(`status: ${status}`);
	}

	const destination = resolve(contentDirectory, `${slug}.md`);
	await mkdir(contentDirectory, { recursive: true });
	await writeFile(destination, `---\n${fields.join('\n')}\n---\n\n`, { flag: 'wx' });
	console.log(`Entrada creada: ${destination}`);
}

try {
	await main();
} catch (error) {
	console.error(`No se pudo crear la entrada: ${error instanceof Error ? error.message : error}`);
	process.exitCode = 1;
} finally {
	readLine.close();
}
