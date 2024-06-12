# Documentation
- Class name: BatchCropResizeInplace
- Category: Mikey/Image
- Output node: False
- Repo Ref: https://github.com/bash-j/mikey_nodes

BatchCropResizeInplace节点旨在通过应用裁剪、调整大小和上采样操作来处理一批图像文件。它高效地处理目录中的图像转换，提供了一种流线化的方法来增强图像质量和尺寸，同时可以选择替换原始文件。

# Input types
## Required
- image_directory
    - image_directory参数指定包含需要处理的图像文件的目录的路径。对于节点定位和访问批量操作的图像至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- subdirectories
    - subdirectories参数决定是否包括指定的image_directory内子目录中的图像文件。这影响批量处理的范围。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: str
- replace_original
    - replace_original参数指示是否应将原始图像文件替换为处理后的图像。这对所做的更改的永久性有重要影响。
    - Comfy dtype: COMBO[true, false]
    - Python dtype: str
- replace_suffix
    - replace_suffix参数定义了在处理后的图像不替换原始文件时附加到图像文件名的后缀。这对于区分原始图像和处理后的图像很重要。
    - Comfy dtype: STRING
    - Python dtype: str
- upscale_method
    - upscale_method参数选择用于放大图像的算法。方法的选择可以显著影响放大图像的质量。
    - Comfy dtype: COMBO[nearest-exact, bilinear, area, bicubic]
    - Python dtype: str
- crop
    - crop参数确定要应用于图像的裁剪方法。它可以禁用裁剪或根据指定的crop_amount应用中心裁剪。
    - Comfy dtype: COMBO[disabled, center]
    - Python dtype: str
- crop_amount
    - crop_amount参数指定要从每侧裁剪的图像比例。它是控制裁剪操作范围的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prompt
    - prompt参数用于某些图像处理任务可能需要的额外指令或上下文。它可以影响节点解释和处理图像的方式。
    - Comfy dtype: STRING
    - Python dtype: str
- extra_pnginfo
    - extra_pnginfo参数提供可用于自定义PNG图像处理过程的额外信息。当需要考虑特定的元数据或属性时，它特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- job_done
    - job_done参数表示批量处理的完成，并提供已处理图像数量的摘要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class BatchCropResizeInplace:
    crop_methods = ['disabled', 'center']
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'image_directory': ('STRING', {'multiline': False, 'placeholder': 'Image Directory'}), 'subdirectories': (['true', 'false'], {'default': 'false'}), 'replace_original': (['true', 'false'], {'default': 'false'}), 'replace_suffix': ('STRING', {'default': '_cropped_resized'}), 'upscale_method': (s.upscale_methods,), 'crop': (s.crop_methods,), 'crop_amount': ('FLOAT', {'default': 0.05})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ('STRING',)
    RETURN_NAMES = ('job_done',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'

    def crop(self, image, crop_amount):
        (width, height) = image.size
        pixels = int(width * crop_amount) // 8 * 8
        left = pixels
        upper = pixels
        right = width - pixels
        lower = height - pixels
        cropped_img = image.crop((left, upper, right, lower))
        return cropped_img

    def upscale(self, image, upscale_method, width, height, crop):
        samples = image.movedim(-1, 1)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
        s = s.movedim(1, -1)
        return (s,)

    def resize(self, image, upscale_method, crop):
        image = pil2tensor(image)
        (w, h) = find_latent_size(image.shape[2], image.shape[1])
        img = self.upscale(image, upscale_method, w, h, crop)[0]
        img = tensor2pil(img)
        return img

    def get_files_from_directory(self, image_directory, subdirectories):
        if subdirectories == 'true':
            files = [os.path.join(root, name) for (root, dirs, files) in os.walk(image_directory) for name in files if name.endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif'))]
        else:
            files = [os.path.join(image_directory, f) for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f)) and f.endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif'))]
        return files

    def batch(self, image_directory, subdirectories, replace_original, replace_suffix, upscale_method, crop, crop_amount, prompt, extra_pnginfo):
        if not os.path.exists(image_directory):
            raise Exception(f'Image directory {image_directory} does not exist')
        files = self.get_files_from_directory(image_directory, subdirectories)
        for file in tqdm(files, desc='Processing images'):
            img = Image.open(file)
            if crop != 'disabled':
                img = self.crop(img, crop_amount)
            img = self.resize(img, upscale_method, crop)
            if replace_original == 'true':
                img.save(file)
            else:
                replace_suffix = search_and_replace(replace_suffix, extra_pnginfo, prompt)
                (filename, file_extension) = os.path.splitext(file)
                img.save(filename + replace_suffix + file_extension)
        return (f'Job done, {len(files)} images processed',)
```