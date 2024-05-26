# Documentation
- Class name: WAS_Image_Grid_Image_Batch
- Category: WAS Suite/Image/Process
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Grid_Image_Batch节点的'smart_grid_image'函数旨在将一批图像智能地排列成网格布局。它动态调整每个图像的大小以适应指定的最大单元格大小，同时保持原始的宽高比。该节点还提供选项以在每个图像周围添加有色边框，以更好地进行视觉区分。其主要目标是启用创建视觉吸引人且组织良好的图像网格，这对于演示和图像集合特别有用。

# Input types
## Required
- images
    - 'image'参数是节点将处理以创建网格的图像张量集合。这是一个关键的输入，因为节点的所有操作都围绕着排列这些图像。该参数直接影响输出网格的组成和视觉结果。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- number_of_columns
    - 'number_of_columns'参数指定生成的网格中的列数。它在确定网格布局方面起着重要作用，影响图像如何分布在网格的宽度上。默认值为6，但可以根据所需的网格配置进行调整。
    - Comfy dtype: INT
    - Python dtype: int
- max_cell_size
    - 'max_cell_size'参数设置网格中每个单元格的最大尺寸（以像素为单位）。它对于控制网格的总体大小以及确保图像被适当缩放非常重要。默认值为256像素，但可以根据不同的显示需求进行修改。
    - Comfy dtype: INT
    - Python dtype: int
- add_border
    - 'add_border'参数是一个布尔标志，当设置为True时，指示节点在网格中的每个图像周围添加边框。这可以增强图像之间的视觉分离，特别适用于需要区分单个图像的网格。
    - Comfy dtype: BOOL
    - Python dtype: bool
- border_red
    - 'border_red'参数定义了为图像添加边框时边框颜色的红色分量。它有助于定制边框的外观，并与'border_green'和'border_blue'一起使用以创建完整的边框颜色。
    - Comfy dtype: INT
    - Python dtype: int
- border_green
    - 'border_green'参数设置边框颜色的绿色分量。当启用'add_border'时，它与'border_red'和'border_blue'一起工作，以确定边框的确切色调。
    - Comfy dtype: INT
    - Python dtype: int
- border_blue
    - 'border_blue'参数指定边框颜色的蓝色分量。它是三种颜色分量之一，与'border_red'和'border_green'一起，决定了边框应用于图像时的视觉样式。
    - Comfy dtype: INT
    - Python dtype: int
- border_width
    - 'border_width'参数确定每个图像周围边框的厚度。它是一个重要的样式元素，可以影响网格的整体外观，使图像更加突出。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - 'output_image'是排列成结构化布局的输入图像组成的结果网格图像。它代表了节点处理的最终成果，包含了通过输入参数所做的视觉排列和样式选择。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Grid_Image_Batch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'images': ('IMAGE',), 'border_width': ('INT', {'default': 3, 'min': 0, 'max': 100, 'step': 1}), 'number_of_columns': ('INT', {'default': 6, 'min': 1, 'max': 24, 'step': 1}), 'max_cell_size': ('INT', {'default': 256, 'min': 32, 'max': 2048, 'step': 1}), 'border_red': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'border_green': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1}), 'border_blue': ('INT', {'default': 0, 'min': 0, 'max': 255, 'step': 1})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'smart_grid_image'
    CATEGORY = 'WAS Suite/Image/Process'

    def smart_grid_image(self, images, number_of_columns=6, max_cell_size=256, add_border=False, border_red=255, border_green=255, border_blue=255, border_width=3):
        cols = number_of_columns
        border_color = (border_red, border_green, border_blue)
        images_resized = []
        max_row_height = 0
        for tensor_img in images:
            img = tensor2pil(tensor_img)
            (img_w, img_h) = img.size
            aspect_ratio = img_w / img_h
            if img_w > img_h:
                cell_w = min(img_w, max_cell_size)
                cell_h = int(cell_w / aspect_ratio)
            else:
                cell_h = min(img_h, max_cell_size)
                cell_w = int(cell_h * aspect_ratio)
            img_resized = img.resize((cell_w, cell_h))
            if add_border:
                img_resized = ImageOps.expand(img_resized, border=border_width // 2, fill=border_color)
            images_resized.append(img_resized)
            max_row_height = max(max_row_height, cell_h)
        max_row_height = int(max_row_height)
        total_images = len(images_resized)
        rows = math.ceil(total_images / cols)
        grid_width = cols * max_cell_size + (cols - 1) * border_width
        grid_height = rows * max_row_height + (rows - 1) * border_width
        new_image = Image.new('RGB', (grid_width, grid_height), border_color)
        for (i, img) in enumerate(images_resized):
            x = i % cols * (max_cell_size + border_width)
            y = i // cols * (max_row_height + border_width)
            (img_w, img_h) = img.size
            paste_x = x + (max_cell_size - img_w) // 2
            paste_y = y + (max_row_height - img_h) // 2
            new_image.paste(img, (paste_x, paste_y, paste_x + img_w, paste_y + img_h))
        if add_border:
            new_image = ImageOps.expand(new_image, border=border_width, fill=border_color)
        return (pil2tensor(new_image),)
```