export interface Photo {
  id: string
  filename: string   // file inside public/
  caption: string
  date?: string
  rotation: number   // degrees, for polaroid tilt
}

// Edit captions and dates freely — filenames map to /public/*.jpg
export const photos: Photo[] = [
  {
    id: 'p1',
    filename: 'ploy1.jpg',
    caption: 'One of my favorite smiles.',
    rotation: -3,
  },
  {
    id: 'p2',
    filename: 'ploy2.jpg',
    caption: 'Glowing, even in the dark.',
    rotation: 2.5,
  },
  {
    id: 'p3',
    filename: 'ploy3.jpg',
    caption: 'You belong somewhere beautiful.',
    rotation: -1.5,
  },
  {
    id: 'p4',
    filename: 'ploy4.jpg',
    caption: 'Being real — that\'s the best version.',
    rotation: 3,
  },
]
