# Documentation
- Class name: WAS_Image_Morph_GIF
- Category: WAS Suite/Animation
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Morph_GIF 节点旨在创建两个图像之间的变形动画。它在一个指定的帧数上平滑地从一个图像过渡到另一个图像，允许定制过渡属性，如帧延迟和循环设置。这个节点特别适用于生成像 GIF 或 APNG 这样的动画序列，可以用于各种多媒体演示或应用程序中。

# Input types
## Required
- image_a
    - 用于变形动画的第一张图像。它设置了过渡的起点，并且对最终输出的外观至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- image_b
    - 动画变形到的第二张图像。这张图像定义了过渡的结束状态，对变形的整体效果有所贡献。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
## Optional
- transition_frames
    - 用于两个图像之间过渡的帧数。数量越多，过渡越平滑，但动画时间也更长。
    - Comfy dtype: INT
    - Python dtype: int
- still_image_delay_ms
    - 在开始变形过渡之前的每个静态帧的延迟时间（以毫秒为单位）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- duration_ms
    - 变形过渡期间每帧的持续时间（以毫秒为单位）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- loops
    - 动画应该循环的次数。值为 0 表示动画将无限循环。
    - Comfy dtype: INT
    - Python dtype: int
- max_size
    - 输出图像的最大尺寸（以像素为单位）。可能会调整大小以适应此限制，同时保持纵横比。
    - Comfy dtype: INT
    - Python dtype: int
- output_path
    - 保存输出 GIF 文件的路径。如果未指定，默认为 './ComfyUI/output'。
    - Comfy dtype: STRING
    - Python dtype: str
- filename
    - 输出 GIF 文件的期望名称。如果未提供，默认为 'morph'。
    - Comfy dtype: STRING
    - Python dtype: str
- filetype
    - 输出动画的文件格式。支持 'GIF' 或 'APNG'。
    - Comfy dtype: COMBO['GIF', 'APNG']
    - Python dtype: str

# Output types
- image_a_pass
    - 第一个输入图像，未改变，包含在输出中以保持连贯性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- image_b_pass
    - 第二个输入图像，未改变，包含在输出中以保持连贯性。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image or torch.Tensor
- filepath_text
    - 创建的 GIF 文件的完整路径。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str
- filename_text
    - 创建的 GIF 的文件名。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Morph_GIF:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_a': ('IMAGE',), 'image_b': ('IMAGE',), 'transition_frames': ('INT', {'default': 30, 'min': 2, 'max': 60, 'step': 1}), 'still_image_delay_ms': ('FLOAT', {'default': 2500.0, 'min': 0.1, 'max': 60000.0, 'step': 0.1}), 'duration_ms': ('FLOAT', {'default': 0.1, 'min': 0.1, 'max': 60000.0, 'step': 0.1}), 'loops': ('INT', {'default': 0, 'min': 0, 'max': 100, 'step': 1}), 'max_size': ('INT', {'default': 512, 'min': 128, 'max': 1280, 'step': 1}), 'output_path': ('STRING', {'default': './ComfyUI/output', 'multiline': False}), 'filename': ('STRING', {'default': 'morph', 'multiline': False}), 'filetype': (['GIF', 'APNG'],)}}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
    RETURN_TYPES = ('IMAGE', 'IMAGE', TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ('image_a_pass', 'image_b_pass', 'filepath_text', 'filename_text')
    FUNCTION = 'create_morph_gif'
    CATEGORY = 'WAS Suite/Animation'

    def create_morph_gif(self, image_a, image_b, transition_frames=10, still_image_delay_ms=10, duration_ms=0.1, loops=0, max_size=512, output_path='./ComfyUI/output', filename='morph', filetype='GIF'):
        tokens = TextTokens()
        WTools = WAS_Tools_Class()
        if 'imageio' not in packages():
            install_package('imageio')
        if filetype not in ['APNG', 'GIF']:
            filetype = 'GIF'
        if output_path.strip() in [None, '', '.']:
            output_path = './ComfyUI/output'
        output_path = tokens.parseTokens(os.path.join(*output_path.split('/')))
        if not os.path.exists(output_path):
            os.makedirs(output_path, exist_ok=True)
        if image_a == None:
            image_a = pil2tensor(Image.new('RGB', (512, 512), (0, 0, 0)))
        if image_b == None:
            image_b = pil2tensor(Image.new('RGB', (512, 512), (255, 255, 255)))
        if transition_frames < 2:
            transition_frames = 2
        elif transition_frames > 60:
            transition_frames = 60
        if duration_ms < 0.1:
            duration_ms = 0.1
        elif duration_ms > 60000.0:
            duration_ms = 60000.0
        output_file = WTools.morph_images([tensor2pil(image_a), tensor2pil(image_b)], steps=int(transition_frames), max_size=int(max_size), loop=int(loops), still_duration=int(still_image_delay_ms), duration=int(duration_ms), output_path=output_path, filename=tokens.parseTokens(filename), filetype=filetype)
        return (image_a, image_b, output_file)
```