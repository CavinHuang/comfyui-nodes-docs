# Documentation
- Class name: WAS_Video_Writer
- Category: WAS Suite/Animation/Writer
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Video_Writer 节点旨在从一系列图像生成视频。它提供调整过渡帧、控制每秒帧数(FPS)和设置图像之间延迟的功能。此外，它可以将图像重新缩放到最大尺寸，并使用指定的编解码器对视频进行编码。该节点特别适用于从一系列输入图像创建动画或延时视频。

# Input types
## Required
- image
    - 用于视频创建过程中的输入图像序列。此参数至关重要，因为它直接影响生成视频的内容。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
## Optional
- transition_frames
    - 图像之间的过渡帧数。值越高，过渡越平滑，但会增加视频时长。
    - Comfy dtype: INT
    - Python dtype: int
- image_delay_sec
    - 每张图像过渡到下一张之前的延迟秒数。这会影响视频的播放速度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- fps
    - 输出视频的每秒帧数。它决定了视频的流畅度和文件大小。
    - Comfy dtype: INT
    - Python dtype: int
- max_size
    - 输出视频的最大尺寸大小（以像素为单位）。可能会发生调整大小以适应此约束。
    - Comfy dtype: INT
    - Python dtype: int
- output_path
    - 输出视频文件将被保存的目录路径。
    - Comfy dtype: STRING
    - Python dtype: str
- filename
    - 输出视频文件的期望名称。
    - Comfy dtype: STRING
    - Python dtype: str
- codec
    - 用于视频编码的编解码器。它影响视频格式和压缩。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- IMAGE_PASS
    - 形成视频内容的连接图像序列。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- filepath_text
    - 视频已保存的文件路径。
    - Comfy dtype: TEXT
    - Python dtype: str
- filename_text
    - 保存的视频的文件名。
    - Comfy dtype: TEXT
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Video_Writer:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        WTools = WAS_Tools_Class()
        v = WTools.VideoWriter()
        codecs = []
        for codec in v.get_codecs():
            codecs.append(codec.upper())
        codecs = sorted(codecs)
        return {'required': {'image': ('IMAGE',), 'transition_frames': ('INT', {'default': 30, 'min': 0, 'max': 120, 'step': 1}), 'image_delay_sec': ('FLOAT', {'default': 2.5, 'min': 0.1, 'max': 60000.0, 'step': 0.1}), 'fps': ('INT', {'default': 30, 'min': 1, 'max': 60.0, 'step': 1}), 'max_size': ('INT', {'default': 512, 'min': 128, 'max': 1920, 'step': 1}), 'output_path': ('STRING', {'default': './ComfyUI/output', 'multiline': False}), 'filename': ('STRING', {'default': 'comfy_writer', 'multiline': False}), 'codec': (codecs,)}}
    RETURN_TYPES = ('IMAGE', TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ('IMAGE_PASS', 'filepath_text', 'filename_text')
    FUNCTION = 'write_video'
    CATEGORY = 'WAS Suite/Animation/Writer'

    def write_video(self, image, transition_frames=10, image_delay_sec=10, fps=30, max_size=512, output_path='./ComfyUI/output', filename='morph', codec='H264'):
        conf = getSuiteConfig()
        if not conf.__contains__('ffmpeg_bin_path'):
            cstr(f'Unable to use MP4 Writer because the `ffmpeg_bin_path` is not set in `{WAS_CONFIG_FILE}`').error.print()
            return (image, '', '')
        if conf.__contains__('ffmpeg_bin_path'):
            if conf['ffmpeg_bin_path'] != '/path/to/ffmpeg':
                sys.path.append(conf['ffmpeg_bin_path'])
                os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'
                os.environ['OPENCV_FFMPEG_BINARY'] = conf['ffmpeg_bin_path']
        if output_path.strip() in [None, '', '.']:
            output_path = './ComfyUI/output'
        if image == None:
            image = pil2tensor(Image.new('RGB', (512, 512), (0, 0, 0)))
        if transition_frames < 0:
            transition_frames = 0
        elif transition_frames > 60:
            transition_frames = 60
        if fps < 1:
            fps = 1
        elif fps > 60:
            fps = 60
        results = []
        for img in image:
            print(img.shape)
            new_image = self.rescale_image(tensor2pil(img), max_size)
            print(new_image.size)
            tokens = TextTokens()
            output_path = os.path.abspath(os.path.join(*tokens.parseTokens(output_path).split('/')))
            output_file = os.path.join(output_path, tokens.parseTokens(filename))
            if not os.path.exists(output_path):
                os.makedirs(output_path, exist_ok=True)
            WTools = WAS_Tools_Class()
            MP4Writer = WTools.VideoWriter(int(transition_frames), int(fps), int(image_delay_sec), max_size=max_size, codec=codec)
            path = MP4Writer.write(new_image, output_file)
            results.append(img)
        return (torch.cat(results, dim=0), path, filename)

    def rescale_image(self, image, max_dimension):
        (width, height) = image.size
        if width > max_dimension or height > max_dimension:
            scaling_factor = max(width, height) / max_dimension
            new_width = int(width / scaling_factor)
            new_height = int(height / scaling_factor)
            image = image.resize((new_width, new_height), Image.Resampling(1))
        return image
```