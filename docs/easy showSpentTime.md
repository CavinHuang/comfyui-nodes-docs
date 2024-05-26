# Documentation
- Class name: showSpentTime
- Category: EasyUse/Util
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

showSpentTime节点旨在提供工作流处理时间的反馈。它捕获推理所花费的时间，并在UI中显示，使用户能够洞察系统的效率。该节点对于监控性能和识别执行管道中的潜在瓶颈至关重要。

# Input types
## Required
- pipe
    - pipe参数至关重要，因为它代表正在处理的数据管道。它包含节点正常运行所需的所有信息，包括可能包含spent_time的loader设置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
## Optional
- spent_time
    - 如果提供此参数，将用于在UI中显示花费的时间。如果没有提供，节点将尝试从pipe的loader设置中检索花费的时间。
    - Comfy dtype: INFO
    - Python dtype: Union[str, None]
- unique_id
    - unique_id参数用于识别工作流中的特定节点。这对于将花费的时间与工作流中的正确节点关联起来至关重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: str
- extra_pnginfo
    - 此参数包含有关图像处理工作流的额外信息，包括工作流本身。它用于定位与unique_id关联的特定节点。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- ui
    - ui输出是一个包含将在用户界面中显示的文本的字典，提供花费的时间信息。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, str
- result
    - result输出是一个空字典，表示这个节点的主要目的是显示信息，而不是为了传递数据进行进一步处理。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class showSpentTime:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'pipe': ('PIPE_LINE',), 'spent_time': ('INFO', {'default': '推理完成后将显示推理时间', 'forceInput': False})}, 'hidden': {'unique_id': 'UNIQUE_ID', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    FUNCTION = 'notify'
    OUTPUT_NODE = True
    RETURN_TYPES = ()
    RETURN_NAMES = ()
    CATEGORY = 'EasyUse/Util'

    def notify(self, pipe, spent_time=None, unique_id=None, extra_pnginfo=None):
        if unique_id and extra_pnginfo and ('workflow' in extra_pnginfo):
            workflow = extra_pnginfo['workflow']
            node = next((x for x in workflow['nodes'] if str(x['id']) == unique_id), None)
            if node:
                spent_time = pipe['loader_settings']['spent_time'] if 'spent_time' in pipe['loader_settings'] else ''
                node['widgets_values'] = [spent_time]
        return {'ui': {'text': spent_time}, 'result': {}}
```