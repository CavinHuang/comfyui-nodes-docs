# Documentation
- Class name: GradientImage
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

GradientImage节点旨在从指定的起始颜色生成到结束颜色的渐变图像。它与图像处理库无缝集成，创建出视觉上吸引人的渐变效果，可用于各种应用，如背景或设计元素。

# Input types
## Required
- width
    - 宽度参数决定了生成的渐变图像的宽度。它是设置图像尺寸的关键因素，进而影响整体的视觉布局和设计。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度参数设置渐变图像的垂直尺寸。它与宽度一起工作，以确定图像的整体大小，这对于将图像适应特定的设计空间至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- start_color_hex
    - start_color_hex参数指定渐变开始处的十六进制颜色代码。它是一个基本输入，决定了渐变图像中颜色过渡的起始点。
    - Comfy dtype: STRING
    - Python dtype: str
- end_color_hex
    - end_color_hex参数定义渐变结束处的十六进制颜色代码。它对于确定渐变中的最终颜色至关重要，从而完成颜色过渡效果。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE
    - IMAGE输出提供生成的渐变图像，可用于各种用途，如视觉演示或图形设计项目。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- MASK
    - MASK输出包括一个遮罩图像，可用于选择性编辑或对渐变图像的特定区域应用特定效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class GradientImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'height': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'start_color_hex': ('STRING', {'multiline': False, 'default': '#FFFFFF', 'dynamicPrompts': False}), 'end_color_hex': ('STRING', {'multiline': False, 'default': '#000000', 'dynamicPrompts': False})}}
    RETURN_TYPES = ('IMAGE', 'MASK')
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False, False)

    def run(self, width, height, start_color_hex, end_color_hex):
        (im, mask) = generate_gradient_image(width, height, start_color_hex, end_color_hex)
        output_dir = folder_paths.get_temp_directory()
        (full_output_folder, filename, counter, subfolder, _) = folder_paths.get_save_image_path('tmp_', output_dir)
        image_file = f'{filename}_{counter:05}.png'
        image_path = os.path.join(full_output_folder, image_file)
        im.save(image_path, compress_level=6)
        im = pil2tensor(im)
        mask = pil2tensor(mask)
        return {'ui': {'images': [{'filename': image_file, 'subfolder': subfolder, 'type': 'temp'}]}, 'result': (im, mask)}
```