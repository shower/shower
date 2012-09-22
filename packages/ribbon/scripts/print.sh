#!/bin/bash

file=$1
name=${file%.*}

echo 'Printing…'

wkhtmltopdf -T 0 -R 0 -B 0 -L 0 --page-width 1024px --page-height 640px --dpi 300 --print-media-type --quiet ${file} ${name}.pdf

echo 'Finished.'

# Usage example: sh print.sh index.html