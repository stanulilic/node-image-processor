# Node-Image-Processor

This command line application is used to convert or resize all images in the given directory and saves them in an output directory.

## Converting Images

Syntax

```
node main.js --convert-to <image_type>
```

To convert images, you must provide `--convert-to` option together with the desired format.

For example, to convert all images to `jpg`, the command will be as follows:

```
node main.js --convert-to jpg
```

## Resizing Images

Syntax

```
node main.js --resize-to <width> <height>
```

You must provide `resize-to` option followed by two arguments: `width` and `height`.

For example, to resize all images to 300x330, do the following:

```
node main.js --resize-to 300 330
```
