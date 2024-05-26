# Documentation
- Class name: WAS_Image_Grid_Image
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Grid_Image节点旨在将一系列图片处理成单个网格图片。它智能地将图片组织成指定数量的列，将它们缩放到最大单元格大小，并可选择性地为每个图片周围添加彩色边框以区分视觉效果。该节点特别适用于从图片目录创建拼贴画或缩略图。

# Input types
## Required
- images_path
    - 参数'images_path'指定了要处理的图片所在的目录路径。这个路径至关重要，因为它指导节点到将被组织成网格的图片的源位置。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- pattern_glob
    - 参数'pattern_glob'用于匹配目录中的特定文件。它允许基于某种模式过滤图片，这在目录中的所有文件并非都是图片或需要一组特定图片时非常有用。
    - Comfy dtype: STRING
    - Python dtype: str
- include_subfolders
    - 参数'include_subfolders'决定是否在创建网格的过程中包含子目录中的图片。将其设置为'true'将使节点扫描并包含指定路径下所有子目录中的图片。
    - Comfy dtype: COMBO[false, true]
    - Python dtype: Union[str, bool]
- number_of_columns
    - 参数'number_of_columns'定义了结果网格图片中的列数。它决定了图片将如何分布在网格的宽度上，影响整体布局。
    - Comfy dtype: INT
    - Python dtype: int
- max_cell_size
    - 参数'max_cell_size'设置了网格中每个图片单元的最大尺寸（以像素为单位）。这确保在处理后没有图片会超出这些尺寸，保持网格中的外观一致性。
    - Comfy dtype: INT
    - Python dtype: int
- border_width
    - 参数'border_width'指定在网格中每个图片周围添加的边框宽度，如果包含边框的话。值为0表示没有边框。
    - Comfy dtype: INT
    - Python dtype: int
- border_red
    - 参数'border_red'连同'border_green'和'border_blue'一起，通过指定RGB颜色值的红色分量来确定每个图片周围边框的颜色。
    - Comfy dtype: INT
    - Python dtype: int
- border_green
    - 参数'border_green'指定边框颜色的RGB颜色值中的绿色分量。
    - Comfy dtype: INT
    - Python dtype: int
- border_blue
    - 参数'border_blue'指定边框颜色的RGB颜色值中的蓝色分量。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- grid_image
    - 'grid_image'输出是包含处理过的图片网格的结果图片。它代表了根据输入参数指定的最终视觉布局。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Grid_Image:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images_path': ('STRING', {'default': './ComfyUI/input/', 'multiline': False}), 'pattern_glob': ('STRING', {'default': '*', 'multiline': False}), 'include_subfolders': (['false', 'true'],), 'border_width': ('INT', {'default': 3, 'min': 0, 'max': 100, 'step': 1}), 'number_of_columns': ('INT', {'default': 6, 'min': 1, 'max': 24, 'step': 1}), 'max_cell_size': ('INT', {'default': 256, 'min': 32, 'max': 1280, 'step': 1}), 'border_red': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'border_green': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'border_blue': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'create_grid_image'
    CATEGORY = 'WAS Suite/Image/Process'

    def create_grid_image(self, images_path, pattern_glob='*', include_subfolders='false', number_of_columns=6, max_cell_size=256, border_width=3, border_red=0, border_green=0, border_blue=0):
        if not os.path.exists(images_path):
            cstr(f'The grid image path `{images_path}` does not exist!').error.print()
            return (pil2tensor(Image.new('RGB', (512, 512), (0, 0, 0))),)
        paths = glob.glob(os.path.join(images_path, pattern_glob), recursive=False if include_subfolders == 'false' else True)
        image_paths = []
        for path in paths:
            if path.lower().endswith(ALLOWED_EXT) and os.path.exists(path):
                image_paths.append(path)
        grid_image = self.smart_grid_image(image_paths, int(number_of_columns), (int(max_cell_size), int(max_cell_size)), False if border_width <= 0 else True, (int(border_red), int(border_green), int(border_blue)), int(border_width))
        return (pil2tensor(grid_image),)

    def smart_grid_image(self, images, cols=6, size=(256, 256), add_border=False, border_color=(0, 0, 0), border_width=3):
        (max_width, max_height) = size
        row_height = 0
        images_resized = []
        for image in images:
            img = Image.open(image).convert('RGB')
            (img_w, img_h) = img.size
            aspect_ratio = img_w / img_h
            if aspect_ratio > 1:
                thumb_w = min(max_width, img_w - border_width)
                thumb_h = thumb_w / aspect_ratio
            else:
                thumb_h = min(max_height, img_h - border_width)
                thumb_w = thumb_h * aspect_ratio
            pad_w = max_width - int(thumb_w)
            pad_h = max_height - int(thumb_h)
            left = pad_w // 2
            top = pad_h // 2
            right = pad_w - left
            bottom = pad_h - top
            padding = (left, top, right, bottom)
            img_resized = ImageOps.expand(img.resize((int(thumb_w), int(thumb_h))), padding)
            if add_border:
                img_resized_bordered = ImageOps.expand(img_resized, border=border_width // 2, fill=border_color)
            images_resized.append(img_resized)
            row_height = max(row_height, img_resized.size[1])
        row_height = int(row_height)
        total_images = len(images_resized)
        rows = math.ceil(total_images / cols)
        new_image = Image.new('RGB', (cols * size[0] + (cols - 1) * border_width, rows * row_height + (rows - 1) * border_width), border_color)
        for (i, img) in enumerate(images_resized):
            if add_border:
                border_img = ImageOps.expand(img, border=border_width // 2, fill=border_color)
                x = i % cols * (size[0] + border_width)
                y = i // cols * (row_height + border_width)
                if border_img.size == (size[0], size[1]):
                    new_image.paste(border_img, (x, y, x + size[0], y + size[1]))
                else:
                    border_img = border_img.resize((size[0], size[1]))
                    new_image.paste(border_img, (x, y, x + size[0], y + size[1]))
            else:
                x = i % cols * (size[0] + border_width)
                y = i // cols * (row_height + border_width)
                if img.size == (size[0], size[1]):
                    new_image.paste(img, (x, y, x + img.size[0], y + img.size[1]))
                else:
                    img = img.resize((size[0], size[1]))
                    new_image.paste(img, (x, y, x + size[0], y + size[1]))
        new_image = ImageOps.expand(new_image, border=border_width, fill=border_color)
        return new_image
```