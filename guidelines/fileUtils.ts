// writeFileInSlices.ts
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

const ensureDirectoryExists = (dirPath: string) => {
  const dirname = path.dirname(dirPath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExists(dirname);
  fs.mkdirSync(dirname);
};

export const writeStringToFileInSlices = async (sliceName: string, data: string, item: number): Promise<void> => {
  try {
    const sliceFolderPath = path.join(__dirname, '/slices', sliceName);
    const filePath = path.join(__dirname, '/slices', sliceName, sliceName + item+ ".jsx");

    // Ensure the directory exists
    ensureDirectoryExists(sliceFolderPath);
    ensureDirectoryExists(filePath);

    // Write data to file
    await fs.promises.writeFile(filePath, data, 'utf8');
    console.log(`Successfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
};


export const writeStringToFileInSlicesModel = async (sliceName: string, data: string): Promise<void> => {
  try {
    const sliceFolderPath = path.join(__dirname, '/slices', sliceName);
    const filePath = path.join(__dirname, '/slices', sliceName, "model.json");

    // Ensure the directory exists
    ensureDirectoryExists(sliceFolderPath);
    ensureDirectoryExists(filePath);

    // Write data to file
    await fs.promises.writeFile(filePath, data, 'utf8');
    console.log(`Successfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
};


export const writeStringToFileInSlicesComponent = async (sliceName: string, data: string): Promise<void> => {
  try {
    const sliceFolderPath = path.join(__dirname, '/slices', sliceName);
    const filePath = path.join(__dirname, '/slices', sliceName, "index.tsx");

    // Ensure the directory exists
    ensureDirectoryExists(sliceFolderPath);
    ensureDirectoryExists(filePath);

    // Write data to file
    await fs.promises.writeFile(filePath, data, 'utf8');
    console.log(`Successfully wrote data to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file: ${error}`);
  }
};

export const readFileSynchronously = (fileName: string): string => {
  try {
    const filePath: string = path.resolve(__dirname, fileName);
    // Read file synchronously
    const data: Buffer = fs.readFileSync(filePath);
    // Convert Buffer to string and return
    return data.toString();
  } catch (error) {
    console.error(`An error occurred while reading the file: ${error}`);
    return '';
  }
};

const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, "");
}

export const editIndexListSynchronously = (componentName: string) => {

  const fileToUpdate = path.join(__dirname, "/slices/index.ts");
  const importLine = `  ${toSnakeCase(componentName)}: dynamic(() => import("./${componentName}")),`;

  fs.readFile(fileToUpdate, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
    }

    const position = data.lastIndexOf('};');
    const updatedData = [data.slice(0, position), importLine, '\n', data.slice(position)].join('');

    fs.writeFile(fileToUpdate, updatedData, 'utf8', (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Component ${componentName} added to the file.`);
      }
    });
  })
};

export const clearComponents = () => {
  deleteSubFolders(path.join(__dirname, "/slices"))
  const fileToUpdate = path.join(__dirname, "/slices/index.ts");
  fs.readFile(fileToUpdate, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
    }

    const updatedData = data.replace(/export const components = \{\n(.*\n)*\};/g, 'export const components = {\n};');

    fs.writeFile(fileToUpdate, updatedData, 'utf8', (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log("All components have been cleared.");
      }
    });
  });
};

const deleteFolderRecursive = (folderPath: string) => {
  if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
          const curPath = path.join(folderPath, file);
          if (fs.lstatSync(curPath).isDirectory()) { // Check if it's a directory
              deleteFolderRecursive(curPath);
          } else { // If it's a file, delete it
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(folderPath);
  }
};

const deleteSubFolders = (originFolderPath: string) => {
  if (!fs.existsSync(originFolderPath)) {
      console.error(`Origin folder does not exist: ${originFolderPath}`);
      return;
  }

  const filesAndFolders = fs.readdirSync(originFolderPath);

  filesAndFolders.forEach(item => {
      const itemPath = path.join(originFolderPath, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
          deleteFolderRecursive(itemPath);
      }
  });
};