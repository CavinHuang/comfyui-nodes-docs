# Documentation
- Class name: VideoInfo
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

VideoInfo节点的'get_video_info'方法旨在从提供的视频信息字典中提取并返回关键的视频信息。它专注于提供一组简洁的视频属性，例如帧率、帧数、时长和尺寸，适用于视频的源状态和加载后状态。该方法作为工具，用于标准化和简化访问视频元数据的过程，这对于各种视频处理任务至关重要。

# Input types
## Required
- video_info
    - 'video_info'参数至关重要，因为它是节点所需的视频元数据的来源。它包含了视频的详细属性，如帧率、帧数和尺寸，无论是在原始状态还是加载后状态。此参数对于节点执行提取和提供视频信息的功能至关重要。
    - Comfy dtype: VHS_VIDEOINFO
    - Python dtype: Dict[str, Union[float, int]]

# Output types
- source_fps
    - 'source_fps'输出提供原始视频源的每秒帧数，这是理解视频播放速度的一个基本参数。
    - Comfy dtype: FLOAT
    - Python dtype: float
- source_frame_count
    - 'source_frame_count'输出指示原始视频中的总帧数，提供了视频长度在帧组成方面的洞察。
    - Comfy dtype: INT
    - Python dtype: int
- source_duration
    - 'source_duration'输出表示原始视频的持续时间，以秒为单位，允许评估视频的时间长度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- source_width
    - 'source_width'输出提供视频的宽度，以像素为单位，这是视频分辨率的关键维度之一。
    - Comfy dtype: INT
    - Python dtype: int
- source_height
    - 'source_height'输出指定视频的高度，以像素为单位，与宽度一起定义视频的分辨率。
    - Comfy dtype: INT
    - Python dtype: int
- loaded_fps
    - 'loaded_fps'输出表示视频加载后的每秒帧数，可能由于处理或播放调整与源视频不同。
    - Comfy dtype: FLOAT
    - Python dtype: float
- loaded_frame_count
    - 'loaded_frame_count'输出反映了视频加载后的总帧数，可能会受到视频处理操作的影响。
    - Comfy dtype: INT
    - Python dtype: int
- loaded_duration
    - 'loaded_duration'输出表示视频加载后的持续时间，可能由于播放速度变化或编辑而与原始视频不同。
    - Comfy dtype: FLOAT
    - Python dtype: float
- loaded_width
    - 'loaded_width'输出提供视频加载后的宽度，可能由于缩放或调整大小操作与源视频不同。
    - Comfy dtype: INT
    - Python dtype: int
- loaded_height
    - 'loaded_height'输出指定视频加载后的高度，可能由于视频处理而与源视频的尺寸不同。
    - Comfy dtype: INT
    - Python dtype: int

# Usage tips
- Infra type: CPU

# Source code
```
class VideoInfo:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'video_info': ('VHS_VIDEOINFO',)}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'
    RETURN_TYPES = ('FLOAT', 'INT', 'FLOAT', 'INT', 'INT', 'FLOAT', 'INT', 'FLOAT', 'INT', 'INT')
    RETURN_NAMES = ('source_fps🟨', 'source_frame_count🟨', 'source_duration🟨', 'source_width🟨', 'source_height🟨', 'loaded_fps🟦', 'loaded_frame_count🟦', 'loaded_duration🟦', 'loaded_width🟦', 'loaded_height🟦')
    FUNCTION = 'get_video_info'

    def get_video_info(self, video_info):
        keys = ['fps', 'frame_count', 'duration', 'width', 'height']
        source_info = []
        loaded_info = []
        for key in keys:
            source_info.append(video_info[f'source_{key}'])
            loaded_info.append(video_info[f'loaded_{key}'])
        return (*source_info, *loaded_info)
```