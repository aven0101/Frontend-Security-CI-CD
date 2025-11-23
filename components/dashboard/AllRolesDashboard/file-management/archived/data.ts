export type FileItem = {
  id: string;
  name: string;
  thumbnail: string;
  modified: string; // YYYY/MM/DD
  type: string; // e.g., image, doc, video
  sizeKB: number;
  starred?: boolean; // whether file is starred
};

// Shared mock data for Archived section
export const archivedFiles: FileItem[] = [
  { id: "1", name: "Alpine Peaks", type: "image", sizeKB: 420, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "2", name: "Blue Forest", type: "image", sizeKB: 380, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "3", name: "Cloud Valley", type: "image", sizeKB: 512, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "4", name: "Dawn Ridge", type: "image", sizeKB: 275, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "5", name: "Emerald Lake", type: "image", sizeKB: 689, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "6", name: "Foggy Pines", type: "image", sizeKB: 301, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "7", name: "Glacier Trail", type: "image", sizeKB: 444, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "8", name: "Hidden Pass", type: "image", sizeKB: 377, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "9", name: "Ivy Meadow", type: "image", sizeKB: 198, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "10", name: "Alpine Peaks", type: "image", sizeKB: 420, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "11", name: "Blue Forest", type: "image", sizeKB: 380, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "12", name: "Cloud Valley", type: "image", sizeKB: 512, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "13", name: "Dawn Ridge", type: "image", sizeKB: 275, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "14", name: "Emerald Lake", type: "image", sizeKB: 689, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "15", name: "Foggy Pines", type: "image", sizeKB: 301, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "16", name: "Glacier Trail", type: "image", sizeKB: 444, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: false },
  { id: "17", name: "Hidden Pass", type: "image", sizeKB: 377, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
  { id: "18", name: "Ivy Meadow", type: "image", sizeKB: 198, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: false },
  { id: "19", name: "Jade Creek", type: "image", sizeKB: 265, modified: "2025/08/16", thumbnail: "/file-management/dummy-file-image.png", starred: true },
];
