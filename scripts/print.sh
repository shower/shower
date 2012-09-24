#!/bin/bash

file=$1
name=${file%.*}

echo 'Printing…'

# http://code.google.com/p/wkhtmltopdf
wkhtmltopdf -T 0 -R 0 -B 0 -L 0 --page-width 1024px --page-height 640px --dpi 300 --print-media-type --quiet ${file} ${name}.pdf

# http://princexml.com
# prince -i html5 ${file}

echo 'Finished.'

# Usage example: sh print.sh index.html