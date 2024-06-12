# Documentation
- Class name: LoadVideoUpload
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

LoadVideoUpload节点旨在高效管理和处理视频文件。它能够从多种来源加载视频，包括本地文件和URL，并提供上采样和操作视频帧的功能。该节点确保视频数据被正确格式化并准备好用于后续处理阶段。

# Input types
## Required
- video
    - 'video'参数至关重要，因为它指定了要处理的视频文件的来源。它可以是指向本地文件的路径，也可以是指向在线视频的URL。此参数直接影响节点加载和访问视频内容的能力。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- force_rate
    - 'force_rate'参数允许调整视频的帧率。这是一个可选设置，可用于确保不同视频之间的帧率一致，这对于某些视频处理任务很重要。
    - Comfy dtype: INT
    - Python dtype: int
- force_size
    - 'force_size'参数用于指定视频帧的期望分辨率。它提供几种预设选项，并允许设置自定义尺寸，这对于保持纵横比或适应特定的显示要求可能是必要的。
    - Comfy dtype: STRING
    - Python dtype: str
- custom_width
    - 当需要自定义视频尺寸时，'custom_width'设置视频帧的宽度。这是一个重要的参数，用于视频尺寸调整操作，确保视频适应所需的宽度限制。
    - Comfy dtype: INT
    - Python dtype: int
- custom_height
    - 'custom_height'参数通过设置视频帧的高度来补充'custom_width'。它在视频尺寸调整中扮演重要角色，特别是当视频内容需要特定的高度要求时。
    - Comfy dtype: INT
    - Python dtype: int
- frame_load_cap
    - 'frame_load_cap'参数决定了从视频中加载的最大帧数。它有助于控制内存使用和处理时间，特别是处理长视频时。
    - Comfy dtype: INT
    - Python dtype: int
- skip_first_frames
    - 'skip_first_frames'参数使节点能够跳过视频开头指定数量的帧。这对于从视频处理工作流程中省略不需要的内容或片头很有用。
    - Comfy dtype: INT
    - Python dtype: int
- select_every_nth
    - 'select_every_nth'参数用于从视频中以规律间隔选择帧。它有助于降低帧率或创建视频内容的摘要。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- IMAGE
    - 'IMAGE'输出以张量的形式提供视频帧，这是一个多维数组，适用于进一步的视频分析和处理。
    - Comfy dtype: TENSOR
    - Python dtype: torch.Tensor
- frame_count
    - 'frame_count'输出指示从视频中加载的总帧数，这对于了解视频数据的范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- audio
    - 'audio'输出是一个函数，当被调用时，提供对视频的音频流的访问。这可以用于音频分析或与视频帧一起用于进一步处理。
    - Comfy dtype: FUNCTION
    - Python dtype: Callable[[], Any]
- video_info
    - 'video_info'输出包含有关视频的元数据，如帧率、时长和尺寸。这些信息对于需要了解视频特性的各种视频处理任务非常有价值。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Union[int, float, str]]

# Usage tips
- Infra type: CPU

# Source code
```
class LoadVideoUpload:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = []
        for f in os.listdir(input_dir):
            if os.path.isfile(os.path.join(input_dir, f)):
                file_parts = f.split('.')
                if len(file_parts) > 1 and file_parts[-1] in video_extensions:
                    files.append(f)
        return {'required': {'video': (sorted(files),), 'force_rate': ('INT', {'default': 0, 'min': 0, 'max': 60, 'step': 1}), 'force_size': (['Disabled', 'Custom Height', 'Custom Width', 'Custom', '256x?', '?x256', '256x256', '512x?', '?x512', '512x512'],), 'custom_width': ('INT', {'default': 512, 'min': 0, 'max': DIMMAX, 'step': 8}), 'custom_height': ('INT', {'default': 512, 'min': 0, 'max': DIMMAX, 'step': 8}), 'frame_load_cap': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX, 'step': 1}), 'skip_first_frames': ('INT', {'default': 0, 'min': 0, 'max': BIGMAX, 'step': 1}), 'select_every_nth': ('INT', {'default': 1, 'min': 1, 'max': BIGMAX, 'step': 1})}, 'optional': {'meta_batch': ('VHS_BatchManager',)}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'
    RETURN_TYPES = ('IMAGE', 'INT', 'VHS_AUDIO', 'VHS_VIDEOINFO')
    RETURN_NAMES = ('IMAGE', 'frame_count', 'audio', 'video_info')
    FUNCTION = 'load_video'

    def load_video(self, **kwargs):
        return load_video_cv(**kwargs)

    @classmethod
    def IS_CHANGED(s, video, **kwargs):
        image_path = folder_paths.get_annotated_filepath(video)
        return calculate_file_hash(image_path)

    @classmethod
    def VALIDATE_INPUTS(s, video, force_size, **kwargs):
        import requests
        if video.startswith('http'):
            resp = requests.head(video)
            if resp.status_code != 200:
                return 'Invalid video file: {}'.format(video)
        elif not folder_paths.exists_annotated_filepath(video):
            return 'Invalid video file: {}'.format(video)
        return True
```