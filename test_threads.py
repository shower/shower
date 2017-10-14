import time
import threading
from io import BytesIO

from PIL import Image
import cv2
from wand.image import Image as WandImage
from pgmagick import Image as PGImage, FilterTypes, Blob, Geometry
from pyvips import Image as VipsImage


imagename = './pictures/cover.jpg'


def deferred_pillow():
    im = Image.open(imagename)
    im.resize((1024, 768), Image.BICUBIC)
    im.save(BytesIO(), format='jpeg', quality=85)


def deferred_opencv():
    im = cv2.imread(imagename)
    cv2.resize(im, (1024, 768), interpolation=cv2.INTER_AREA)
    cv2.imencode(".jpeg", im, [int(cv2.IMWRITE_JPEG_QUALITY), 85])


def deferred_wand():
    with WandImage(filename=imagename) as im:
        im.resize(1024, 768, 'catrom')
        im.compression_quality = 85
        im.format = 'jpeg'
        im.save(file=BytesIO())


def deferred_pgmagick():
    im = PGImage(imagename)

    im.filterType(FilterTypes.CatromFilter)
    im.zoom(Geometry(1024, 768))

    im.quality(85)
    im.magick('jpeg')
    im.write(Blob())


def deferred_vips():
    im = VipsImage.new_from_file(imagename)
    im.resize(0.4, kernel='cubic')
    im.write_to_buffer('.jpeg', Q=85)


start = time.time()
t = threading.Thread(target=deferred_wand)
t.start()
n = 0

while t.isAlive():
    time.sleep(.001)
    n += 1

print '>>>', time.time() - start, n
