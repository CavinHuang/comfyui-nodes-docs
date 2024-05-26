# Documentation
- Class name: NoiseImage
- Category: ♾️Mixlab/Image
- Output node: False
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

该节点根据指定的噪声级别在纯色背景上生成带有噪声的图像，为图像数据的测试和视觉实验提供了多功能工具。

# Input types
## Required
- width
    - 宽度决定了输出图像的水平尺寸，这对于定义噪声模式应用的画布至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 高度设置了图像的垂直大小，与宽度一起协同工作，建立噪声生成的整体大小和范围。
    - Comfy dtype: INT
    - Python dtype: int
- noise_level
    - 噪声级别控制应用于图像的随机噪声的强度，直接影响最终结果的视觉效果和复杂性。
    - Comfy dtype: INT
    - Python dtype: int
- color_hex
    - 颜色十六进制定义了图像背景的基本颜色，它是噪声模式叠加的基础。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- result
    - 输出是一个带有噪声的图像，反映了输入参数，成为图像处理工作流中进一步分析或操作的关键工件。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class NoiseImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'width': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'height': ('INT', {'default': 512, 'min': 1, 'max': 8192, 'step': 1, 'display': 'number'}), 'noise_level': ('INT', {'default': 128, 'min': 0, 'max': 8192, 'step': 1, 'display': 'slider'}), 'color_hex': ('STRING', {'multiline': False, 'default': '#FFFFFF', 'dynamicPrompts': False})}}
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/Image'
    INPUT_IS_LIST = False
    OUTPUT_IS_LIST = (False,)

    def run(self, width, height, noise_level, color_hex):
        im = create_noisy_image(width, height, 'RGB', noise_level, color_hex)
        output_dir = folder_paths.get_temp_directory()
        (full_output_folder, filename, counter, subfolder, _) = folder_paths.get_save_image_path('tmp_', output_dir)
        image_file = f'{filename}_{counter:05}.png'
        image_path = os.path.join(full_output_folder, image_file)
        im.save(image_path, compress_level=6)
        im = pil2tensor(im)
        return {'ui': {'images': [{'filename': image_file, 'subfolder': subfolder, 'type': 'temp'}]}, 'result': (im,)}
```