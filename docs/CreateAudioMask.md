# Documentation
- Class name: CreateAudioMask
- Category: KJNodes/deprecated
- Output node: False
- Repo Ref: https://github.com/kijai/ComfyUI-KJNodes.git

CreateAudioMask节点旨在将音频信号转换为视觉表示，具体是创建与音频频率内容相对应的掩码。它使用librosa库从音频文件生成频谱图，然后将该频谱图可视化为一系列圆圈，其大小与不同频率下音频的幅度成比例。该节点通过提供一种可视化音频频率随时间演变的方法，为音频到视觉的转换过程做出了贡献。

# Input types
## Required
- invert
    - ‘invert’参数决定生成的掩码在颜色上是否应该被反转。在掩码和背景之间对比度至关重要的应用中，这可能非常重要。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- frames
    - ‘frames’参数指定从音频文件处理的帧数。它对于控制音频到视觉转换的时间分辨率至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- scale
    - ‘scale’参数调整生成掩码中圆圈的大小，与音频帧的平均幅度成比例。它在音频频率内容的视觉表示中起着至关重要的作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- audio_path
    - ‘audio_path’参数定义了用于生成掩码的音频文件的路径。它是一个关键输入，因为它直接影响生成的掩码的内容和质量。
    - Comfy dtype: STRING
    - Python dtype: str
- width
    - ‘width’参数设置输出图像的宽度，以像素为单位。它是定义视觉表示空间维度的一个重要参数。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - ‘height’参数设置输出图像的高度，以像素为单位。它与‘width’参数协同工作，以确定视觉表示的整体形状。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- output_image
    - 'output_image' 是音频数据的视觉表示，作为音频到视觉转换过程的结果生成。它在一个单一图像中封装了音频的时间和频率特征。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 'mask'输出提供了音频频率内容的二进制表示，突出显示了音频信号中幅度显著的区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class CreateAudioMask:

    def __init__(self):
        try:
            import librosa
            self.librosa = librosa
        except ImportError:
            print("Can not import librosa. Install it with 'pip install librosa'")
    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'createaudiomask'
    CATEGORY = 'KJNodes/deprecated'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'invert': ('BOOLEAN', {'default': False}), 'frames': ('INT', {'default': 16, 'min': 1, 'max': 255, 'step': 1}), 'scale': ('FLOAT', {'default': 0.5, 'min': 0.0, 'max': 2.0, 'step': 0.01}), 'audio_path': ('STRING', {'default': 'audio.wav'}), 'width': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1}), 'height': ('INT', {'default': 256, 'min': 16, 'max': 4096, 'step': 1})}}

    def createaudiomask(self, frames, width, height, invert, audio_path, scale):
        batch_size = frames
        out = []
        masks = []
        if audio_path == 'audio.wav':
            audio_path = os.path.join(script_directory, audio_path)
        (audio, sr) = self.librosa.load(audio_path)
        spectrogram = np.abs(self.librosa.stft(audio))
        for i in range(batch_size):
            image = Image.new('RGB', (width, height), 'black')
            draw = ImageDraw.Draw(image)
            frame = spectrogram[:, i]
            circle_radius = int(height * np.mean(frame))
            circle_radius *= scale
            circle_center = (width // 2, height // 2)
            draw.ellipse([(circle_center[0] - circle_radius, circle_center[1] - circle_radius), (circle_center[0] + circle_radius, circle_center[1] + circle_radius)], fill='white')
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            mask = image[:, :, :, 0]
            masks.append(mask)
            out.append(image)
        if invert:
            return (1.0 - torch.cat(out, dim=0),)
        return (torch.cat(out, dim=0), torch.cat(masks, dim=0))
```