---
tags:
- Crop
- Image
- ImageTransformation
---

# Batch Crop Resize Inplace (Mikey)
## Documentation
- Class name: `Batch Crop Resize Inplace`
- Category: `Mikey/Image`
- Output node: `False`

This node is designed to perform in-place cropping and resizing operations on a batch of images. It aims to modify the dimensions of each image in the batch according to specified parameters, optimizing the images for further processing or analysis.
## Input types
### Required
- **`image_directory`**
    - Specifies the directory containing the images to be processed. This parameter is crucial for locating and loading the images for subsequent cropping and resizing operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`subdirectories`**
    - Indicates whether to include subdirectories within the specified image directory for processing. This parameter allows for more comprehensive image selection.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`replace_original`**
    - Determines whether the original images should be replaced with the processed versions. This parameter affects how the output images are saved.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`replace_suffix`**
    - Specifies the suffix to be added to the filenames of processed images when not replacing the original images. This parameter helps in identifying the modified images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`upscale_method`**
    - Defines the method to be used for upscaling the images during the resizing process. This parameter influences the quality and dimensions of the output images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`crop`**
    - Specifies the cropping method to be applied to the images. This parameter determines how the images are cropped before resizing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`crop_amount`**
    - Determines the proportion of the image to be cropped. This parameter directly influences the final dimensions of the images, playing a key role in the resizing process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`job_done`**
    - Comfy dtype: `STRING`
    - The output is a string message indicating the completion of the processing job, including the number of images processed. This provides a summary of the operation's outcome.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchCropResizeInplace:
    crop_methods = ["disabled", "center"]
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image_directory": ("STRING", {"multiline": False, "placeholder": "Image Directory"}),
                             "subdirectories": (['true', 'false'], {"default": 'false'}),
                             "replace_original": (['true', 'false'], {"default": 'false'}),
                             "replace_suffix": ("STRING", {"default": "_cropped_resized"}),
                             "upscale_method": (s.upscale_methods,),
                             "crop": (s.crop_methods,),
                             "crop_amount": ("FLOAT", {"default": 0.05})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}

    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('job_done',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'

    def crop(self, image, crop_amount):
        # resize image
        width, height = image.size
        pixels = int(width * crop_amount) // 8 * 8
        left = pixels
        upper = pixels
        right = width - pixels
        lower = height - pixels
        # Crop the image
        cropped_img = image.crop((left, upper, right, lower))
        return cropped_img

    def upscale(self, image, upscale_method, width, height, crop):
        samples = image.movedim(-1,1)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
        s = s.movedim(1,-1)
        return (s,)

    def resize(self, image, upscale_method, crop):
        image = pil2tensor(image)
        w, h = find_latent_size(image.shape[2], image.shape[1])
        img = self.upscale(image, upscale_method, w, h, crop)[0]
        img = tensor2pil(img)
        return img

    def get_files_from_directory(self, image_directory, subdirectories):
        if subdirectories == 'true':
            files = [os.path.join(root, name)
                    for root, dirs, files in os.walk(image_directory)
                    for name in files
                    if name.endswith((".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif"))]
        else:
            files = [os.path.join(image_directory, f)
                     for f in os.listdir(image_directory)
                     if os.path.isfile(os.path.join(image_directory, f)) and f.endswith((".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif"))]
        return files

    def batch(self, image_directory, subdirectories, replace_original, replace_suffix, upscale_method, crop, crop_amount,
              prompt, extra_pnginfo):
        if not os.path.exists(image_directory):
            raise Exception(f"Image directory {image_directory} does not exist")

        files = self.get_files_from_directory(image_directory, subdirectories)

        for file in tqdm(files, desc='Processing images'):
            img = Image.open(file)
            # crop image
            if crop != 'disabled':
                img = self.crop(img, crop_amount)
            # resize image
            img = self.resize(img, upscale_method, crop)
            # save image
            if replace_original == 'true':
                img.save(file)
            else:
                replace_suffix = search_and_replace(replace_suffix, extra_pnginfo, prompt)
                filename, file_extension = os.path.splitext(file)
                img.save(filename + replace_suffix + file_extension)
        return (f'Job done, {len(files)} images processed',)

```
