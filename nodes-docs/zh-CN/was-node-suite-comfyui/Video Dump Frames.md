# Documentation
- Class name: WAS_Video_Frame_Dump
- Category: WAS Suite/Animation
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Video_Frame_Dump 节点旨在处理视频文件，通过提取单独的帧并将它们保存为图像文件。这个实用工具特别适合用于动画和视频分析工作流程，允许用户将视频内容分解为一系列静态图像。节点可以配置为指定视频源、输出目录、提取帧的命名前缀以及所需的图像格式。此外，它还提供了设置文件编号位数和高级用户所需的 ffmpeg 二进制路径的选项。节点的功能封装在其 dump_video_frames 方法中，该方法协调帧提取过程，并返回输出目录的路径以及处理过的帧数。

# Input types
## Required
- video_path
    - video_path 参数指定了要从中提取帧的视频文件的文件路径。这个输入至关重要，因为它决定了帧转储操作的源内容。节点将使用此路径来定位和处理视频，使其成为执行的基本部分。
    - Comfy dtype: STRING
    - Python dtype: str
- output_path
    - output_path 参数定义了保存提取帧的目录。它是一个必要的参数，因为它决定了视频帧提取过程后结果图像文件的存储位置。用户应确保此目录可写，并且有足够的空间容纳输出文件。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prefix
    - prefix 参数用于定义保存的图像文件的命名约定。它是一个可选输入，允许用户在每个文件名的开头添加一个特定的字符串。这对于组织文件或与期望某种命名模式的其他系统集成可能很有用。
    - Comfy dtype: STRING
    - Python dtype: str
- filenumber_digits
    - filenumber_digits 参数确定保存的图像文件名中用于零填充文件编号的位数。这是一个可选设置，可以根据用户的偏好或文件命名一致性的要求进行调整。此参数影响输出文件名的格式。
    - Comfy dtype: INT
    - Python dtype: int
- extension
    - extension 参数指定提取的图像帧的文件格式。用户可以从 'png'、'jpg'、'gif' 或 'tiff' 的组合中选择。这个输入影响将生成的图像文件类型，这可能取决于提取帧的预期用途。
    - Comfy dtype: COMBO['png', 'jpg', 'gif', 'tiff']
    - Python dtype: str

# Output types
- output_path
    - 输出中的 output_path 参数反映了保存提取帧的目录。它很重要，因为它提供了视频帧转储过程后图像文件的位置。这些信息对用户定位和进一步处理输出文件至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- processed_count
    - processed_count 输出参数指示从视频中成功提取的帧数。它作为节点执行的确认，并且可以用来验证帧提取过程的完整性。
    - Comfy dtype: NUMBER
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Video_Frame_Dump:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'video_path': ('STRING', {'default': './ComfyUI/input/MyVideo.mp4', 'multiline': False}), 'output_path': ('STRING', {'default': './ComfyUI/input/MyVideo', 'multiline': False}), 'prefix': ('STRING', {'default': 'frame_', 'multiline': False}), 'filenumber_digits': ('INT', {'default': 4, 'min': -1, 'max': 8, 'step': 1}), 'extension': (['png', 'jpg', 'gif', 'tiff'],)}}

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
    RETURN_TYPES = (TEXT_TYPE, 'NUMBER')
    RETURN_NAMES = ('output_path', 'processed_count')
    FUNCTION = 'dump_video_frames'
    CATEGORY = 'WAS Suite/Animation'

    def dump_video_frames(self, video_path, output_path, prefix='fame_', extension='png', filenumber_digits=-1):
        conf = getSuiteConfig()
        if not conf.__contains__('ffmpeg_bin_path'):
            cstr(f'Unable to use dump frames because the `ffmpeg_bin_path` is not set in `{WAS_CONFIG_FILE}`').error.print()
            return ('', 0)
        if conf.__contains__('ffmpeg_bin_path'):
            if conf['ffmpeg_bin_path'] != '/path/to/ffmpeg':
                sys.path.append(conf['ffmpeg_bin_path'])
                os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'
                os.environ['OPENCV_FFMPEG_BINARY'] = conf['ffmpeg_bin_path']
        if output_path.strip() in [None, '', '.']:
            output_path = './ComfyUI/input/frames'
        tokens = TextTokens()
        output_path = os.path.abspath(os.path.join(*tokens.parseTokens(output_path).split('/')))
        prefix = tokens.parseTokens(prefix)
        WTools = WAS_Tools_Class()
        MP4Writer = WTools.VideoWriter()
        processed = MP4Writer.extract(video_path, output_path, prefix, extension, filenumber_digits)
        return (output_path, processed)
```