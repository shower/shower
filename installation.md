
# Pillow-SIMD

$ time pip install pillow
real  0m3.222s

$ sudo apt-get install libtiff5-dev libjpeg8-dev zlib1g-dev \
    libfreetype6-dev liblcms2-dev libwebp-dev libharfbuzz-dev libfribidi-dev
After this operation, 18.0 MB of additional disk space will be used.

$ time pip install pillow-simd
real  0m12.715s


# OpenCV

$ sudo apt-get install python-opencv
>>> import cv2; cv2.__version__
<<< '2.4.9.1'

$ pip install opencv-python==3.3.0.10
ImportError: libSM.so.6: cannot open shared object file


# Magicks

$ sudo apt-get install libmagickwand-dev
Need to get 52.9 MB of archives.
After this operation, 214 MB of additional disk space will be used.

$ pip install wand

$ sudo apt-get install libboost-python1.58-dev libgraphicsmagick++1-dev
Need to get 43.2 MB of archives.
After this operation, 253 MB of additional disk space will be used.

$ time pip install pgmagick
real  6m 45s


# vips

$ pip install pyvips

$ sudo apt-get install libvips-dev libglib2.0-dev
Need to get 157 MB of archives.
After this operation, 770 MB of additional disk space will be used.
Unpacking firefox (56.0+build6-0ubuntu0.16.04.2) ...
