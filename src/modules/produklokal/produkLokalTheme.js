import { Blocks, Coffee, Factory, Footprints, Music, Palette, Shirt, Waves } from 'lucide-react'

// Tema visual tiap kartu produk — murni presentasi, tidak mengubah konten.
// Dipakai ProdukLokalFlow untuk mewarnai latar kartu sesuai produknya.
export const TEMA_BY_ID = {
  1: {
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #B45309 60%, #D97706 100%)',
    chip: 'bg-white/20 text-amber-100',
    Icon: Shirt,
    motif: 'weave',
  },
  2: {
    gradient: 'linear-gradient(135deg, #2A1A0E 0%, #5B3416 60%, #8A5A2B 100%)',
    chip: 'bg-white/20 text-amber-100',
    Icon: Coffee,
    motif: 'beans',
  },
  3: {
    gradient: 'linear-gradient(135deg, #0F3D22 0%, #1F6B3A 60%, #4C9A5F 100%)',
    chip: 'bg-white/20 text-green-100',
    Icon: Music,
    motif: 'strings',
  },
  4: {
    gradient: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 60%, #6D28D9 100%)',
    chip: 'bg-white/20 text-violet-100',
    Icon: Palette,
    motif: 'batik',
  },
  5: {
    gradient: 'linear-gradient(135deg, #2B1002 0%, #6B3410 60%, #A8641F 100%)',
    chip: 'bg-white/20 text-amber-100',
    Icon: Footprints,
    motif: 'stitch',
  },
  6: {
    gradient: 'linear-gradient(135deg, #1F2937 0%, #4B5563 60%, #9CA3AF 100%)',
    chip: 'bg-white/20 text-gray-100',
    Icon: Factory,
    motif: 'factory',
  },
  7: {
    gradient: 'linear-gradient(135deg, #6D28D9 0%, #DB2777 60%, #F59E0B 100%)',
    chip: 'bg-white/20 text-pink-100',
    Icon: Blocks,
    motif: 'blocks',
  },
  8: {
    gradient: 'linear-gradient(135deg, #075985 0%, #0EA5E9 55%, #BAE6FD 100%)',
    chip: 'bg-white/25 text-sky-50',
    Icon: Waves,
    motif: 'salt',
  },
}

export function getTema(id) {
  return TEMA_BY_ID[id] ?? TEMA_BY_ID[1]
}
