import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import * as yaml from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface MemberInfo {
  name: string;
  account: string;
}

interface ParsedMember extends MemberInfo {
  filename: string;
}

function parseMemberFile(filepath: string, filename: string): ParsedMember | null {
  try {
    const content = readFileSync(filepath, "utf-8");
    const match = content.match(/^---\n([\s\S]*?)\n---/);

    if (!match) {
      console.warn(`No YAML frontmatter found in ${filename}`);
      return null;
    }

    const yamlContent = match[1];
    const parsed = yaml.load(yamlContent) as MemberInfo;

    if (!parsed.name || !parsed.account) {
      console.warn(`Missing required fields in ${filename}`);
      return null;
    }

    return {
      ...parsed,
      filename,
    };
  } catch (error) {
    console.error(`Error parsing ${filename}:`, error);
    return null;
  }
}

function generateMembersTable(members: ParsedMember[]): string {
  const header = "| Name | Account |\n|------|---------|";
  const rows = members.map((member) => {
    const accountLink = `[${member.account}](${member.account})`;
    return `| ${member.name} | ${accountLink} |`;
  });

  return [header, ...rows].join("\n");
}

function updateReadme(membersTable: string): void {
  const readmePath = join(__dirname, "..", "README.md");
  const readmeContent = readFileSync(readmePath, "utf-8");

  const startMarker = "<!-- MEMBERS_LIST_START -->";
  const endMarker = "<!-- MEMBERS_LIST_END -->";

  const startIndex = readmeContent.indexOf(startMarker);
  const endIndex = readmeContent.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find MEMBERS_LIST markers in README.md");
    return;
  }

  const newContent = readmeContent.substring(0, startIndex + startMarker.length) + "\n" + membersTable + "\n" + readmeContent.substring(endIndex);

  writeFileSync(readmePath, newContent);
  console.log("README.md updated successfully");
}

function main(): void {
  const membersDir = join(__dirname, "..", "members");

  try {
    const files = readdirSync(membersDir)
      .filter((file) => file.endsWith(".md"))
      .sort();

    const members: ParsedMember[] = [];

    for (const file of files) {
      const filepath = join(membersDir, file);
      const member = parseMemberFile(filepath, file);

      if (member) {
        members.push(member);
      }
    }

    if (members.length === 0) {
      console.log("No valid member files found");
      return;
    }

    const membersTable = generateMembersTable(members);
    updateReadme(membersTable);

    console.log(`Processed ${members.length} member(s)`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
