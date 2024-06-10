# Documentation
- Class name: VideoInfoLoaded
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

VideoInfoLoaded节点的'get_video_info'方法旨在提取并返回视频的关键信息，包括每秒帧数(fps)、帧数、时长、宽度和高度。此节点在提供视频元数据的结构化摘要中起着关键作用，这对于进一步的视频处理和分析任务至关重要。

# Input types
## Required
- video_info
    - 'video_info'参数是VideoInfoLoaded节点的关键输入，因为它包含了节点运行所需的已加载视频元数据。它直接影响节点提取和返回准确视频信息的能力。
    - Comfy dtype: VHS_VIDEOINFO
    - Python dtype: Dict[str, Union[float, int]]

# Output types
- fps
    - 'fps'输出代表视频的每秒帧数，这是理解视频播放速度的关键参数，对于视频编辑和播放兼容性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_count
    - 'frame_count'输出提供了视频中的总帧数，这对于估计视频的时长以及各种分析和处理工作流程至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- duration
    - 'duration'输出表示视频的总长度，以秒为单位，这是视频制作中用于计时和同步的基本信息。
    - Comfy dtype: FLOAT
    - Python dtype: float
- width
    - 'width'输出表示视频的宽度，以像素为单位，与高度一起决定了视频的宽高比，这对于显示和格式考虑很重要。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 'height'输出指定了视频的高度，以像素为单位，与宽度相辅相成，定义了视频的整体分辨率，是视频视觉清晰度的关键因素。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class VideoInfoLoaded:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'video_info': ('VHS_VIDEOINFO',)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'
    RETURN_TYPES = ('FLOAT', 'INT', 'FLOAT', 'INT', 'INT')
    RETURN_NAMES = ('fps🟦', 'frame_count🟦', 'duration🟦', 'width🟦', 'height🟦')
    FUNCTION = 'get_video_info'

    def get_video_info(self, video_info):
        keys = ['fps', 'frame_count', 'duration', 'width', 'height']
        loaded_info = []
        for key in keys:
            loaded_info.append(video_info[f'loaded_{key}'])
        return (*loaded_info,)
```