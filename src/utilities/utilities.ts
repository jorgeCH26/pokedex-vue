export const getTypeClass = (type: string) => {
    const typeColors: { [key: string]: string } = {
        fire: 'bg-red-200 text-red-800',
        water: 'bg-blue-200 text-blue-800',
        grass: 'bg-green-200 text-green-800',
        electric: 'bg-yellow-200 text-yellow-800',
        normal: 'bg-gray-200 text-gray-800',
        fighting: 'bg-orange-200 text-orange-800',
        flying: 'bg-indigo-200 text-indigo-800',
        poison: 'bg-purple-200 text-purple-800',
        rock: 'bg-gray-400 text-gray-900',
        bug: 'bg-lime-200 text-lime-800',
        ghost: 'bg-violet-200 text-violet-800',
        steel: 'bg-slate-200 text-slate-800',
        fairy: 'bg-pink-200 text-pink-800',
        psychic: 'bg-pink-200 text-pink-800',
        ice: 'bg-cyan-200 text-cyan-800',
        dragon: 'bg-blue-300 text-blue-900',
        dark: 'bg-black text-white',
        ground: 'bg-yellow-300 text-yellow-900',
    };
    return typeColors[type] || 'bg-gray-200 text-gray-800';
};

export const getGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-r from-red-500 to-yellow-500',
      'bg-gradient-to-r from-blue-500 to-cyan-500',
      'bg-gradient-to-r from-green-500 to-lime-500',
      'bg-gradient-to-r from-purple-500 to-pink-500',
      'bg-gradient-to-r from-orange-400 to-red-600',
      'bg-gradient-to-r from-teal-400 to-emerald-500',
    ];
    return gradients[index % gradients.length];
  };
