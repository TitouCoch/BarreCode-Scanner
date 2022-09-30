from skimage import io
from skimage.measure import label, regionprops
from skimage.filters import threshold_otsu
from skimage.color import rgba2rgb
from skimage.color import rgb2gray
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

def get_heights(filename: str) -> list:
    """Ouvre une image et retourne une liste d'hauteurs
    """
    # Convertion en rgba puis en grayscale puis en binaire
    image = io.imread(filename)
    im2 = rgba2rgb(image)
    im= rgb2gray(im2)
    binary_im = im > threshold_otsu(im)    

    # Etiquette connecté regions comme objet
    labeled = label(binary_im)

    # avoir les potision et les dimensions de la limites de objets
    bar_dimensions = [r.bbox for r in regionprops(labeled)]

    # trié par axe x
    bar_dimensions.sort(key=lambda x: x[1], reverse=False)

    # le premier objet et le logo sport track crrespond à la plus grande barre
    logo = bar_dimensions[0]
    max_height = logo[2] - logo[0]
    sequence = []
    for bar in bar_dimensions[1:]:
        height = bar[2] - bar[0]
        ratio = height / max_height
        # multiplé par 8 pour avoir un octer d'entier
        ratio *= 8
        ratio //= 1
        # convertion en entier
        sequence.append(int(ratio - 1))
    return sequence

print(get_heights("F:\BUT\Semestre3\SAE.01\image2.png"))
