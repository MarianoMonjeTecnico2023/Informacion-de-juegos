// Diccionario de traducciones comunes en juegos
const commonTranslations = {
    // Géneros
    'Action': 'Acción',
    'Adventure': 'Aventura',
    'RPG': 'Rol',
    'Strategy': 'Estrategia',
    'Shooter': 'Disparos',
    'Sports': 'Deportes',
    'Racing': 'Carreras',
    'Puzzle': 'Puzle',
    'Platform': 'Plataformas',
    'Fighting': 'Lucha',
    'Simulation': 'Simulación',
    'Indie': 'Independiente',
    'Arcade': 'Arcade',
    'Massively Multiplayer': 'Multijugador Masivo',
    'Family': 'Familiar',
    'Board Games': 'Juegos de Mesa',
    'Educational': 'Educativo',
    'Card': 'Cartas',
    
    // Términos comunes
    'Release Date': 'Fecha de Lanzamiento',
    'Rating': 'Calificación',
    'Developer': 'Desarrollador',
    'Publisher': 'Editor',
    'Platform': 'Plataforma',
    'Requirements': 'Requisitos',
    'Minimum': 'Mínimos',
    'Recommended': 'Recomendados',
    'Processor': 'Procesador',
    'Memory': 'Memoria',
    'Graphics': 'Gráficos',
    'Storage': 'Almacenamiento',
    'Operating System': 'Sistema Operativo',
    'Network': 'Red',
    'Sound Card': 'Tarjeta de Sonido',
    'Additional Notes': 'Notas Adicionales',

    // Términos específicos de juegos
    'Gameplay': 'Jugabilidad',
    'Story': 'Historia',
    'Character': 'Personaje',
    'World': 'Mundo',
    'Level': 'Nivel',
    'Mission': 'Misión',
    'Quest': 'Misión',
    'Battle': 'Batalla',
    'Combat': 'Combate',
    'Enemy': 'Enemigo',
    'Boss': 'Jefe',
    'Weapon': 'Arma',
    'Item': 'Objeto',
    'Inventory': 'Inventario',
    'Experience': 'Experiencia',
    'Skill': 'Habilidad',
    'Ability': 'Habilidad',
    'Power': 'Poder',
    'Magic': 'Magia',
    'Spell': 'Hechizo',
    'Team': 'Equipo',
    'Party': 'Grupo',
    'Multiplayer': 'Multijugador',
    'Single Player': 'Un Jugador',
    'Co-op': 'Cooperativo',
    'PvP': 'Jugador contra Jugador',
    'MMO': 'Multijugador Masivo',
    'FPS': 'Disparos en Primera Persona',
    'TPS': 'Disparos en Tercera Persona',
    'Open World': 'Mundo Abierto',
    'Sandbox': 'Mundo Libre',
    'Survival': 'Supervivencia',
    'Horror': 'Terror',
    'Sci-fi': 'Ciencia Ficción',
    'Fantasy': 'Fantasía',
    'Medieval': 'Medieval',
    'Post-apocalyptic': 'Post-apocalíptico',
    'Cyberpunk': 'Cyberpunk',
    'Steampunk': 'Steampunk',
    'Dystopian': 'Distópico',
    'Utopian': 'Utópico',
    'Historical': 'Histórico',
    'Modern': 'Moderno',
    'Futuristic': 'Futurista',
    'Space': 'Espacio',
    'Underwater': 'Submarino',
    'Underground': 'Subterráneo',
    'City': 'Ciudad',
    'Village': 'Pueblo',
    'Castle': 'Castillo',
    'Dungeon': 'Mazmorra',
    'Cave': 'Cueva',
    'Forest': 'Bosque',
    'Desert': 'Desierto',
    'Mountain': 'Montaña',
    'Island': 'Isla',
    'Ocean': 'Océano',
    'River': 'Río',
    'Lake': 'Lago',
    'Swamp': 'Pantano',
    'Jungle': 'Jungla',
    'Tundra': 'Tundra',
    'Arctic': 'Ártico',
    'Volcano': 'Volcán',
    'Canyon': 'Cañón',
    'Valley': 'Valle',
    'Plains': 'Llanuras',
    'Beach': 'Playa',
    'Coast': 'Costa',
    'Port': 'Puerto',
    'Harbor': 'Puerto',
    'Airport': 'Aeropuerto',
    'Station': 'Estación',
    'Base': 'Base',
    'Outpost': 'Puesto',
    'Camp': 'Campamento',
    'Fortress': 'Fortaleza',
    'Tower': 'Torre',
    'Temple': 'Templo',
    'Shrine': 'Santuario',
    'Altar': 'Altar',
    'Graveyard': 'Cementerio',
    'Cemetery': 'Cementerio',
    'Ruins': 'Ruinas',
    'Remains': 'Restos',
    'Wreckage': 'Restos',
    'Shipwreck': 'Naufragio',
    'Crash': 'Accidente',
    'Crash Site': 'Lugar del Accidente',
    'Battlefield': 'Campo de Batalla',
    'Warzone': 'Zona de Guerra',
    'Frontline': 'Primera Línea',
    'Trench': 'Trinchera',
    'Bunker': 'Búnker',
    'Tunnel': 'Túnel',
    'Mine': 'Mina',
    'Quarry': 'Cantera',
    'Factory': 'Fábrica',
    'Warehouse': 'Almacén',
    'Market': 'Mercado',
    'Shop': 'Tienda',
    'Store': 'Tienda',
    'Mall': 'Centro Comercial',
    'Museum': 'Museo',
    'Library': 'Biblioteca',
    'School': 'Escuela',
    'University': 'Universidad',
    'Hospital': 'Hospital',
    'Clinic': 'Clínica',
    'Laboratory': 'Laboratorio',
    'Research Center': 'Centro de Investigación',
    'Observatory': 'Observatorio',
    'Space Station': 'Estación Espacial',
    'Space Ship': 'Nave Espacial',
    'Spacecraft': 'Nave Espacial',
    'Space Shuttle': 'Transbordador Espacial',
    'Rocket': 'Cohete',
    'Satellite': 'Satélite',
    'Space Probe': 'Sonda Espacial',
    'Space Colony': 'Colonia Espacial',
    'Space Base': 'Base Espacial',
    'Space Port': 'Puerto Espacial',
    'Space Dock': 'Muelle Espacial',
    'Space Elevator': 'Ascensor Espacial',
    'Space Cannon': 'Cañón Espacial',
    'Space Defense': 'Defensa Espacial',
    'Space Fleet': 'Flota Espacial',
    'Space Army': 'Ejército Espacial',
    'Space Marine': 'Marine Espacial',
    'Space Pirate': 'Pirata Espacial',
    'Space Bandit': 'Bandido Espacial',
    'Space Criminal': 'Criminal Espacial',
    'Space Terrorist': 'Terrorista Espacial',
    'Space Rebel': 'Rebelde Espacial',
    'Space Resistance': 'Resistencia Espacial',
    'Space Alliance': 'Alianza Espacial',
    'Space Federation': 'Federación Espacial',
    'Space Empire': 'Imperio Espacial',
    'Space Republic': 'República Espacial',
    'Space Democracy': 'Democracia Espacial',
    'Space Dictatorship': 'Dictadura Espacial',
    'Space Monarchy': 'Monarquía Espacial',
    'Space Theocracy': 'Teocracia Espacial',
    'Space Oligarchy': 'Oligarquía Espacial',
    'Space Anarchy': 'Anarquía Espacial',
    'Space Utopia': 'Utopía Espacial',
    'Space Dystopia': 'Distopía Espacial',
    'Space Paradise': 'Paraíso Espacial',
    'Space Hell': 'Infierno Espacial',
    'Space Heaven': 'Cielo Espacial',
    'Space Purgatory': 'Purgatorio Espacial',
    'Space Limbo': 'Limbo Espacial',
    'Space Void': 'Vacío Espacial',
    'Space Abyss': 'Abismo Espacial',
    'Space Dimension': 'Dimensión Espacial',
    'Space Realm': 'Reino Espacial',
    'Space World': 'Mundo Espacial',
    'Space Universe': 'Universo Espacial',
    'Space Multiverse': 'Multiverso Espacial',
    'Space Time': 'Tiempo Espacial',
    'Space Continuum': 'Continuo Espacial',
    'Space Fabric': 'Tela Espacial',
    'Space Matrix': 'Matriz Espacial',
    'Space Grid': 'Cuadrícula Espacial',
    'Space Field': 'Campo Espacial',
    'Space Force': 'Fuerza Espacial',
    'Space Energy': 'Energía Espacial',
    'Space Power': 'Poder Espacial',
    'Space Magic': 'Magia Espacial',
    'Space Technology': 'Tecnología Espacial',
    'Space Science': 'Ciencia Espacial',
    'Space Research': 'Investigación Espacial',
    'Space Discovery': 'Descubrimiento Espacial',
    'Space Exploration': 'Exploración Espacial',
    'Space Travel': 'Viaje Espacial',
    'Space Journey': 'Viaje Espacial',
    'Space Adventure': 'Aventura Espacial',
    'Space Mission': 'Misión Espacial',
    'Space Quest': 'Misión Espacial',
    'Space Challenge': 'Desafío Espacial',
    'Space Battle': 'Batalla Espacial',
    'Space War': 'Guerra Espacial',
    'Space Conflict': 'Conflicto Espacial',
    'Space Struggle': 'Lucha Espacial',
    'Space Fight': 'Pelea Espacial',
    'Space Combat': 'Combate Espacial',
    'Space Duel': 'Duelo Espacial',
    'Space Tournament': 'Torneo Espacial',
    'Space Championship': 'Campeonato Espacial',
    'Space Competition': 'Competencia Espacial',
    'Space Race': 'Carrera Espacial',
    'Space Chase': 'Persecución Espacial',
    'Space Hunt': 'Cacería Espacial',
    'Space Search': 'Búsqueda Espacial',
    'Space Investigation': 'Investigación Espacial',
    'Space Mystery': 'Misterio Espacial',
    'Space Secret': 'Secreto Espacial',
    'Space Conspiracy': 'Conspiración Espacial',
    'Space Plot': 'Trama Espacial',
    'Space Scheme': 'Plan Espacial',
    'Space Plan': 'Plan Espacial',
    'Space Strategy': 'Estrategia Espacial',
    'Space Tactics': 'Tácticas Espaciales',
    'Space Maneuver': 'Maniobra Espacial',
    'Space Operation': 'Operación Espacial',
    'Space Campaign': 'Campaña Espacial',
    'Space Invasion': 'Invasión Espacial',
    'Space Attack': 'Ataque Espacial',
    'Space Assault': 'Asalto Espacial',
    'Space Raid': 'Incursión Espacial',
    'Space Strike': 'Golpe Espacial',
    'Space Blitz': 'Blitz Espacial',
    'Space Ambush': 'Emboscada Espacial',
    'Space Trap': 'Trampa Espacial',
    'Space Decoy': 'Señuelo Espacial',
    'Space Distraction': 'Distracción Espacial',
    'Space Diversion': 'Diversión Espacial',
    'Space Cover': 'Cobertura Espacial',
    'Space Shield': 'Escudo Espacial',
    'Space Barrier': 'Barrera Espacial',
    'Space Wall': 'Muro Espacial',
    'Space Fortress': 'Fortaleza Espacial',
    'Space Base': 'Base Espacial',
    'Space Station': 'Estación Espacial',
    'Space Outpost': 'Puesto Espacial',
    'Space Colony': 'Colonia Espacial',
    'Space Settlement': 'Asentamiento Espacial',
    'Space City': 'Ciudad Espacial',
    'Space Town': 'Pueblo Espacial',
    'Space Village': 'Aldea Espacial',
    'Space Hamlet': 'Aldea Espacial',
    'Space Camp': 'Campamento Espacial',
    'Space Refuge': 'Refugio Espacial',
    'Space Sanctuary': 'Santuario Espacial',
    'Space Haven': 'Refugio Espacial',
    'Space Shelter': 'Refugio Espacial',
    'Space Home': 'Hogar Espacial',
    'Space House': 'Casa Espacial',
    'Space Building': 'Edificio Espacial',
    'Space Structure': 'Estructura Espacial',
    'Space Construction': 'Construcción Espacial',
    'Space Project': 'Proyecto Espacial',
    'Space Work': 'Trabajo Espacial',
    'Space Labor': 'Trabajo Espacial',
    'Space Effort': 'Esfuerzo Espacial',
    'Space Achievement': 'Logro Espacial',
    'Space Success': 'Éxito Espacial',
    'Space Victory': 'Victoria Espacial',
    'Space Triumph': 'Triunfo Espacial',
    'Space Glory': 'Gloria Espacial',
    'Space Honor': 'Honor Espacial',
    'Space Pride': 'Orgullo Espacial',
    'Space Fame': 'Fama Espacial',
    'Space Legend': 'Leyenda Espacial',
    'Space Myth': 'Mito Espacial',
    'Space Story': 'Historia Espacial',
    'Space Tale': 'Cuento Espacial',
    'Space Narrative': 'Narrativa Espacial',
    'Space Theme': 'Tema Espacial',
    'Space Setting': 'Ambiente Espacial',
    'Space Background': 'Fondo Espacial',
    'Space Environment': 'Ambiente Espacial',
    'Space Atmosphere': 'Atmósfera Espacial',
    'Space Climate': 'Clima Espacial',
    'Space Weather': 'Clima Espacial',
    'Space Storm': 'Tormenta Espacial',
    'Space Hurricane': 'Huracán Espacial',
    'Space Tornado': 'Tornado Espacial',
    'Space Earthquake': 'Terremoto Espacial',
    'Space Tsunami': 'Tsunami Espacial',
    'Space Flood': 'Inundación Espacial',
    'Space Fire': 'Fuego Espacial',
    'Space Explosion': 'Explosión Espacial',
    'Space Collision': 'Colisión Espacial',
    'Space Impact': 'Impacto Espacial',
    'Space Crash': 'Accidente Espacial',
    'Space Wreck': 'Naufragio Espacial',
    'Space Ruin': 'Ruina Espacial',
    'Space Destruction': 'Destrucción Espacial',
    'Space Devastation': 'Devastación Espacial',
    'Space Catastrophe': 'Catástrofe Espacial',
    'Space Disaster': 'Desastre Espacial',
    'Space Tragedy': 'Tragedia Espacial',
    'Space Calamity': 'Calamidad Espacial',
    'Space Cataclysm': 'Cataclismo Espacial',
    'Space Apocalypse': 'Apocalipsis Espacial',
    'Space Armageddon': 'Armagedón Espacial',
    'Space Doomsday': 'Día del Juicio Espacial',
    'Space Judgment': 'Juicio Espacial',
    'Space Justice': 'Justicia Espacial',
    'Space Law': 'Ley Espacial',
    'Space Order': 'Orden Espacial',
    'Space Chaos': 'Caos Espacial',
    'Space Disorder': 'Desorden Espacial',
    'Space Confusion': 'Confusión Espacial',
    'Space Mystery': 'Misterio Espacial',
    'Space Enigma': 'Enigma Espacial',
    'Space Riddle': 'Acertijo Espacial',
    'Space Puzzle': 'Rompecabezas Espacial',
    'Space Challenge': 'Desafío Espacial',
    'Space Test': 'Prueba Espacial',
    'Space Trial': 'Prueba Espacial',
    'Space Ordeal': 'Prueba Espacial',
    'Space Obstacle': 'Obstáculo Espacial',
    'Space Barrier': 'Barrera Espacial',
    'Space Blockade': 'Bloqueo Espacial',
    'Space Wall': 'Muro Espacial',
    'Space Gate': 'Puerta Espacial',
    'Space Door': 'Puerta Espacial',
    'Space Entrance': 'Entrada Espacial',
    'Space Exit': 'Salida Espacial',
    'Space Path': 'Camino Espacial',
    'Space Road': 'Camino Espacial',
    'Space Way': 'Camino Espacial',
    'Space Route': 'Ruta Espacial',
    'Space Trail': 'Sendero Espacial',
    'Space Track': 'Pista Espacial',
    'Space Course': 'Curso Espacial',
    'Space Direction': 'Dirección Espacial',
    'Space Destination': 'Destino Espacial',
    'Space Goal': 'Objetivo Espacial',
    'Space Target': 'Objetivo Espacial',
    'Space Aim': 'Objetivo Espacial',
    'Space Purpose': 'Propósito Espacial',
    'Space Mission': 'Misión Espacial',
    'Space Quest': 'Misión Espacial',
    'Space Task': 'Tarea Espacial',
    'Space Duty': 'Deber Espacial',
    'Space Responsibility': 'Responsabilidad Espacial',
    'Space Role': 'Rol Espacial',
    'Space Part': 'Parte Espacial',
    'Space Position': 'Posición Espacial',
    'Space Place': 'Lugar Espacial',
    'Space Location': 'Ubicación Espacial',
    'Space Site': 'Sitio Espacial',
    'Space Spot': 'Lugar Espacial',
    'Space Point': 'Punto Espacial',
    'Space Area': 'Área Espacial',
    'Space Zone': 'Zona Espacial',
    'Space Region': 'Región Espacial',
    'Space Territory': 'Territorio Espacial',
    'Space Domain': 'Dominio Espacial',
    'Space Realm': 'Reino Espacial',
    'Space Kingdom': 'Reino Espacial',
    'Space Empire': 'Imperio Espacial',
    'Space Nation': 'Nación Espacial',
    'Space State': 'Estado Espacial',
    'Space Country': 'País Espacial',
    'Space Land': 'Tierra Espacial',
    'Space World': 'Mundo Espacial',
    'Space Planet': 'Planeta Espacial',
    'Space Star': 'Estrella Espacial',
    'Space Sun': 'Sol Espacial',
    'Space Moon': 'Luna Espacial',
    'Space Satellite': 'Satélite Espacial',
    'Space Asteroid': 'Asteroide Espacial',
    'Space Comet': 'Cometa Espacial',
    'Space Meteor': 'Meteoro Espacial',
    'Space Meteorite': 'Meteorito Espacial',
    'Space Debris': 'Escombros Espaciales',
    'Space Dust': 'Polvo Espacial',
    'Space Gas': 'Gas Espacial',
    'Space Cloud': 'Nube Espacial',
    'Space Nebula': 'Nebulosa Espacial',
    'Space Galaxy': 'Galaxia Espacial',
    'Space Universe': 'Universo Espacial',
    'Space Cosmos': 'Cosmos Espacial',
    'Space Creation': 'Creación Espacial',
    'Space Origin': 'Origen Espacial',
    'Space Beginning': 'Principio Espacial',
    'Space Start': 'Inicio Espacial',
    'Space End': 'Fin Espacial',
    'Space Conclusion': 'Conclusión Espacial',
    'Space Result': 'Resultado Espacial',
    'Space Outcome': 'Resultado Espacial',
    'Space Effect': 'Efecto Espacial',
    'Space Impact': 'Impacto Espacial',
    'Space Influence': 'Influencia Espacial',
    'Space Power': 'Poder Espacial',
    'Space Force': 'Fuerza Espacial',
    'Space Energy': 'Energía Espacial',
    'Space Strength': 'Fuerza Espacial',
    'Space Might': 'Poder Espacial',
    'Space Authority': 'Autoridad Espacial',
    'Space Control': 'Control Espacial',
    'Space Command': 'Mando Espacial',
    'Space Leadership': 'Liderazgo Espacial',
    'Space Rule': 'Regla Espacial',
    'Space Law': 'Ley Espacial',
    'Space Order': 'Orden Espacial',
    'Space System': 'Sistema Espacial',
    'Space Structure': 'Estructura Espacial',
    'Space Organization': 'Organización Espacial',
    'Space Institution': 'Institución Espacial',
    'Space Establishment': 'Establecimiento Espacial',
    'Space Foundation': 'Fundación Espacial',
    'Space Formation': 'Formación Espacial',
    'Space Development': 'Desarrollo Espacial',
    'Space Growth': 'Crecimiento Espacial',
    'Space Progress': 'Progreso Espacial',
    'Space Advancement': 'Avance Espacial',
    'Space Improvement': 'Mejora Espacial',
    'Space Enhancement': 'Mejora Espacial',
    'Space Upgrade': 'Mejora Espacial',
    'Space Update': 'Actualización Espacial',
    'Space Change': 'Cambio Espacial',
    'Space Transformation': 'Transformación Espacial',
    'Space Evolution': 'Evolución Espacial',
    'Space Revolution': 'Revolución Espacial',
    'Space Innovation': 'Innovación Espacial',
    'Space Invention': 'Invención Espacial',
    'Space Discovery': 'Descubrimiento Espacial',
    'Space Production': 'Producción Espacial',
    'Space Generation': 'Generación Espacial'
};

// Traducciones específicas por género
const genreSpecificTranslations = {
    'Action': {
        'combat': 'Combate',
        'fight': 'Lucha',
        'battle': 'Batalla',
        'enemy': 'Enemigo',
        'boss': 'Jefe',
        'weapon': 'Arma',
        'attack': 'Ataque',
        'defend': 'Defender',
        'dodge': 'Esquivar',
        'block': 'Bloquear',
        'parry': 'Parar',
        'counter': 'Contraatacar',
        'combo': 'Combo',
        'special move': 'Movimiento Especial',
        'ultimate': 'Ultimate',
        'finisher': 'Golpe Final',
        'critical hit': 'Golpe Crítico',
        'damage': 'Daño',
        'health': 'Vida',
        'armor': 'Armadura',
        'shield': 'Escudo',
        'power-up': 'Mejora',
        'bonus': 'Bonus',
        'reward': 'Recompensa',
        'victory': 'Victoria',
        'defeat': 'Derrota',
        'arena': 'Arena',
        'stadium': 'Estadio',
        'battlefield': 'Campo de Batalla',
        'challenge': 'Desafío',
        'tournament': 'Torneo',
        'championship': 'Campeonato'
    },
    'RPG': {
        'character': 'Personaje',
        'level': 'Nivel',
        'experience': 'Experiencia',
        'quest': 'Misión',
        'quest giver': 'Dador de Misiones',
        'quest log': 'Registro de Misiones',
        'inventory': 'Inventario',
        'equipment': 'Equipamiento',
        'stats': 'Estadísticas',
        'skill': 'Habilidad',
        'talent': 'Talento',
        'class': 'Clase',
        'race': 'Raza',
        'party': 'Grupo',
        'guild': 'Hermandad',
        'loot': 'Botín',
        'drop': 'Objeto Caído',
        'craft': 'Crear',
        'crafting': 'Creación',
        'recipe': 'Receta',
        'material': 'Material',
        'gold': 'Oro',
        'currency': 'Moneda',
        'shop': 'Tienda',
        'merchant': 'Comerciante',
        'vendor': 'Vendedor',
        'trade': 'Comerciar',
        'quest reward': 'Recompensa de Misión',
        'main quest': 'Misión Principal',
        'side quest': 'Misión Secundaria',
        'daily quest': 'Misión Diaria',
        'weekly quest': 'Misión Semanal'
    },
    'Strategy': {
        'resource': 'Recurso',
        'build': 'Construir',
        'construction': 'Construcción',
        'unit': 'Unidad',
        'troop': 'Tropa',
        'army': 'Ejército',
        'base': 'Base',
        'building': 'Edificio',
        'research': 'Investigación',
        'technology': 'Tecnología',
        'upgrade': 'Mejora',
        'production': 'Producción',
        'economy': 'Economía',
        'population': 'Población',
        'territory': 'Territorio',
        'map': 'Mapa',
        'grid': 'Cuadrícula',
        'tile': 'Casilla',
        'turn': 'Turno',
        'phase': 'Fase',
        'round': 'Ronda',
        'match': 'Partida',
        'campaign': 'Campaña',
        'scenario': 'Escenario',
        'objective': 'Objetivo',
        'victory condition': 'Condición de Victoria',
        'defeat condition': 'Condición de Derrota',
        'alliance': 'Alianza',
        'diplomacy': 'Diplomacia',
        'trade route': 'Ruta Comercial',
        'battle formation': 'Formación de Batalla'
    },
    'Sports': {
        'match': 'Partido',
        'game': 'Juego',
        'team': 'Equipo',
        'player': 'Jugador',
        'coach': 'Entrenador',
        'stadium': 'Estadio',
        'field': 'Campo',
        'court': 'Pista',
        'score': 'Puntuación',
        'goal': 'Gol',
        'point': 'Punto',
        'foul': 'Falta',
        'penalty': 'Penalti',
        'referee': 'Árbitro',
        'tournament': 'Torneo',
        'championship': 'Campeonato',
        'league': 'Liga',
        'season': 'Temporada',
        'training': 'Entrenamiento',
        'practice': 'Práctica',
        'skill': 'Habilidad',
        'technique': 'Técnica',
        'strategy': 'Estrategia',
        'tactic': 'Táctica',
        'formation': 'Formación',
        'substitution': 'Sustitución',
        'half-time': 'Medio Tiempo',
        'overtime': 'Tiempo Extra',
        'final': 'Final',
        'quarter-final': 'Cuartos de Final',
        'semi-final': 'Semifinal'
    }
};

// Caché de traducciones
const translationCache = new Map();

// Función para traducir texto con contexto de género
function translateText(text, genre = null) {
    if (!text) return '';
    
    // Si el texto ya está en caché, devolverlo
    if (translationCache.has(text)) {
        return translationCache.get(text);
    }

    // Buscar traducciones específicas del género
    if (genre && genreSpecificTranslations[genre]) {
        const genreTranslations = genreSpecificTranslations[genre];
        for (const [key, value] of Object.entries(genreTranslations)) {
            if (text.toLowerCase().includes(key.toLowerCase())) {
                const translated = text.replace(new RegExp(key, 'gi'), value);
                translationCache.set(text, translated);
                return translated;
            }
        }
    }

    // Buscar traducciones exactas en el diccionario común
    if (commonTranslations[text]) {
        translationCache.set(text, commonTranslations[text]);
        return commonTranslations[text];
    }

    // Buscar traducciones parciales en el diccionario común
    for (const [key, value] of Object.entries(commonTranslations)) {
        if (text.toLowerCase().includes(key.toLowerCase())) {
            const translated = text.replace(new RegExp(key, 'gi'), value);
            translationCache.set(text, translated);
            return translated;
        }
    }

    // Si no hay traducción, devolver el texto original
    translationCache.set(text, text);
    return text;
}

// Función para traducir HTML con contexto de género
function translateHtml(html, genre = null) {
    if (!html) return '';
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Traducir nodos de texto
    function translateNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text) {
                node.textContent = translateText(text, genre);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Ignorar elementos script y style
            if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                Array.from(node.childNodes).forEach(translateNode);
            }
        }
    }

    translateNode(doc.body);
    return doc.body.innerHTML;
}

// Exportar las funciones
export { translateText, translateHtml };

// Asegurarse de que las funciones están disponibles globalmente
window.translateHtml = translateHtml;
window.translateText = translateText;
window.commonTranslations = commonTranslations; 