# Documentation
- Class name: WAS_Image_Morph_GIF_Writer
- Category: WAS Suite/Animation/Writer
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Morph_GIF_Writer 节点旨在从一系列图像或帧创建动画 GIF。它提供管理帧之间过渡、控制它们之间的延迟以及设置 GIF 循环行为的功能。这个节点特别适合以无缝高效的方式生成动画，适用于各种应用，如视觉特效、演示或网络内容。

# Input types
## Required
- image
    - 用于创建 GIF 动画帧的输入图像或图像系列。此参数至关重要，因为它直接影响生成的动画的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor] 或 torch.Tensor
## Optional
- transition_frames
    - 生成每对图像之间的转换帧数。此参数通过控制每个帧过渡到下一帧的速度，影响动画的平滑度。
    - Comfy dtype: INT
    - Python dtype: int
- image_delay_ms
    - 每个帧过渡开始前的延迟时间，以毫秒为单位。此参数对于控制动画的时机很重要，可以根据需要调整以创建所需的效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- duration_ms
    - GIF 动画的总时长，以毫秒为单位。此参数设置了从开始到结束的动画整体长度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- loops
    - GIF 循环的次数。值为 0 表示 GIF 将无限循环。
    - Comfy dtype: INT
    - Python dtype: int
- max_size
    - 输出 GIF 的最大尺寸，以像素为单位。此参数适用于缩小动画以适应特定的显示要求或限制。
    - Comfy dtype: INT
    - Python dtype: int
- output_path
    - 保存输出 GIF 文件的路径。此参数决定了文件系统中存储最终动画的位置。
    - Comfy dtype: STRING
    - Python dtype: str
- filename
    - 输出 GIF 文件的名称。此参数允许用户为动画文件指定所需的名称。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image_pass
    - 用于创建 GIF 的处理过的图像或图像系列。此输出反映了节点处理后的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor] 或 torch.Tensor
- filepath_text
    - 创建的 GIF 动画的完整文件路径。此输出适用于引用或进一步处理动画文件。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str
- filename_text
    - 创建的 GIF 文件的名称。此输出提供了给动画文件的特定名称。
    - Comfy dtype: TEXT_TYPE
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Morph_GIF_Writer:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image': ('IMAGE',), 'transition_frames': ('INT', {'default': 30, 'min': 2, 'max': 60, 'step': 1}), 'image_delay_ms': ('FLOAT', {'default': 2500.0, 'min': 0.1, 'max': 60000.0, 'step': 0.1}), 'duration_ms': ('FLOAT', {'default': 0.1, 'min': 0.1, 'max': 60000.0, 'step': 0.1}), 'loops': ('INT', {'default': 0, 'min': 0, 'max': 100, 'step': 1}), 'max_size': ('INT', {'default': 512, 'min': 128, 'max': 1280, 'step': 1}), 'output_path': ('STRING', {'default': comfy_paths.output_directory, 'multiline': False}), 'filename': ('STRING', {'default': 'morph_writer', 'multiline': False})}}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
    RETURN_TYPES = ('IMAGE', TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ('image_pass', 'filepath_text', 'filename_text')
    FUNCTION = 'write_to_morph_gif'
    CATEGORY = 'WAS Suite/Animation/Writer'

    def write_to_morph_gif(self, image, transition_frames=10, image_delay_ms=10, duration_ms=0.1, loops=0, max_size=512, output_path='./ComfyUI/output', filename='morph'):
        if 'imageio' not in packages():
            install_package('imageio')
        if output_path.strip() in [None, '', '.']:
            output_path = './ComfyUI/output'
        if image is None:
            image = pil2tensor(Image.new('RGB', (512, 512), (0, 0, 0))).unsqueeze(0)
        if transition_frames < 2:
            transition_frames = 2
        elif transition_frames > 60:
            transition_frames = 60
        if duration_ms < 0.1:
            duration_ms = 0.1
        elif duration_ms > 60000.0:
            duration_ms = 60000.0
        tokens = TextTokens()
        output_path = os.path.abspath(os.path.join(*tokens.parseTokens(output_path).split('/')))
        output_file = os.path.join(output_path, tokens.parseTokens(filename) + '.gif')
        if not os.path.exists(output_path):
            os.makedirs(output_path, exist_ok=True)
        WTools = WAS_Tools_Class()
        GifMorph = WTools.GifMorphWriter(int(transition_frames), int(duration_ms), int(image_delay_ms))
        for img in image:
            pil_img = tensor2pil(img)
            GifMorph.write(pil_img, output_file)
        return (image, output_file, filename)
```