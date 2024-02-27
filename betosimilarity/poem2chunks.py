#! /usr/bin/env python3

sample1 = """Paz sobre la constelación cantante de las aguas
Entrechocadas como los hombros de la multitud
Paz en el mar a las olas de buena voluntad
Paz sobre la lápida de los naufragios
Paz sobre los tambores del orgullo y las pupilas tenebrosas
Y si yo soy el traductor de las olas
Paz también sobre mí.

He aquí el molde lleno de trizaduras del destino
El molde de la venganza
Con sus frases iracundas despegándose de los labios
He aquí el molde lleno de gracia
Cuando eres dulce y estás allí hipnotizado por las estrellas"""

sample2 = """He aquí la muerte inagotable desde el principio del mundo
Porque un día nadie se paseará por el tiempo
Nadie a lo largo del tiempo empedrado de planetas difuntos"""

sample3 = """Este es el mar
El mar con sus olas propias
Con sus propios sentidos
El mar tratando de romper sus cadenas
Queriendo imitar la eternidad
Queriendo ser pulmón o neblina de pájaros en pena
O el jardín de los astros que pesan en el cielo
Sobre las tinieblas que arrastramos
O que acaso nos arrastran
Cuando vuelan de repente todas las palomas de la luna
Y se hace más oscuro que las encrucijadas de la muerte"""


def display_by_chunks(text, index, step=1, as_list=True, verbose=False):
    text_num = [(i, line) for i, line in enumerate(text.split('\n'))]
    
    if verbose:
        print(' POEMA COMPLETO '.center(50, '='))
        for i, line in text_num:
            print(i, line)
        print(' FIN POEMA COMPLETO '.center(50, '='))

    versos = text.split('\n')
    left = index - step
    right = index + step
    chunks = {}
    i = 0

    while left >= 0 or right <= len(versos)-1:
        i += 1
        chunks[i] = []
        if left < 0:
            left = 0
        if left >= 0:
            chunks[i].append(versos[left:index])
        left -= step
        
        chunks[i].append([versos[index]])

        if right > len(versos)-1:
            right = len(versos)
        if right <= len(versos)-1:
            if right == len(versos)-1: # cambiar este if. no gusta, pero funciona
                right += 1
            chunks[i].append(versos[index+1:right+1])
        right += step

    # prepare output: lists or strings
    if not as_list:
        strings = {}
        for i in chunks:
            joined = '\n'.join([verso for context in chunks[i] for verso in context])
            strings[i] = joined
    
    if verbose:
        if as_list:
            for k, vs in chunks.items():
                print(f'\nchunk {k} as list:\n')
                for v in vs:
                    print(v)
        else:
            for k, vs in strings.items():
                print(f'\nchunk {k} as string:\n\n{vs}')

    if as_list:
        return chunks
    else:
        return strings
            

if __name__ == '__main__':
    chunks = display_by_chunks(sample1, index=2, step=1, as_list=False, verbose=True)
    