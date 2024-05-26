# Documentation
- Class name: CR_SimplePromptScheduler
- Category: Comfyroll/Animation/Schedulers
- Output node: False
- Repo Ref: https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes

CR_SimplePromptScheduler 是一个用于管理和根据关键帧列表调度提示的节点。它允许在特定帧自动更改提示，从而在不需要手动干预的情况下促进动态和特定帧内容的创建。这个节点对于简化画过程至关重要，特别是当处理需要精确提示调整的复杂序列时。

# Input types
## Required
- keyframe_list
    - 关键帧列表是一个关键参数，它定义了提示及其对应的帧的顺序。它使节点能够有效地调度提示，确保在动画的正确时间显示正确的提示。
    - Comfy dtype: STRING
    - Python dtype: str
- current_frame
    - 当前帧参数至关重要，因为它指示动画时间轴上的当前点。节点使用这些信息来确定关键帧列表中哪个提示应该对正在进行的帧处于激活状态。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- keyframe_format
    - 关键帧格式参数指定了关键帧数据的结构，允许节点正确解析和解释关键帧列表。对于保持调度提示的完整性和准确性很重要。
    - Comfy dtype: COMBO['CR', 'Deforum']
    - Python dtype: str

# Output types
- current_prompt
    - 当前提示输出提供了当前帧的激活提示。它很重要，因为它直接影响着动画中显示或处理的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- next_prompt
    - 下一个提示输出指示将在下一帧中激活的提示。这允许对即将到来的内容进行预期，并可用于提示之间的平滑过渡。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - 权重输出表示当前提示和下一个提示之间的过渡权重。它用于插值提示，以实现逐渐变化，增强动画的流畅性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- show_help
    - 显示帮助输出提供了一个链接到文档以获得进一步帮助。对于需要更多关于节点功能信息或需要故障排除支持的用户来说，这是有用的。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CR_SimplePromptScheduler:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'keyframe_list': ('STRING', {'multiline': True, 'default': 'frame_number, text'}), 'current_frame': ('INT', {'default': 0.0, 'min': 0.0, 'max': 9999.0, 'step': 1.0}), 'keyframe_format': (['CR', 'Deforum'],)}}
    RETURN_TYPES = ('STRING', 'STRING', 'FLOAT', 'STRING')
    RETURN_NAMES = ('current_prompt', 'next_prompt', 'weight', 'show_help')
    FUNCTION = 'simple_schedule'
    CATEGORY = icons.get('Comfyroll/Animation/Schedulers')

    def simple_schedule(self, keyframe_list, keyframe_format, current_frame):
        keyframes = list()
        if keyframe_list == '':
            print(f'[Error] CR Simple Prompt Scheduler. No lines in keyframe list')
            return ()
        lines = keyframe_list.split('\n')
        for line in lines:
            if keyframe_format == 'Deforum':
                line = line.replace(':', ',')
                line = line.rstrip(',')
            if not line.strip():
                print(f'[Warning] CR Simple Prompt Scheduler. Skipped blank line at line {i}')
                continue
            keyframes.extend([('SIMPLE', line)])
        (current_prompt, next_prompt, current_keyframe, next_keyframe) = prompt_scheduler(keyframes, 'SIMPLE', current_frame)
        if current_prompt == '':
            print(f'[Warning] CR Simple Prompt Scheduler. No prompt found for frame. Simple schedules must start at frame 0.')
        else:
            try:
                current_prompt_out = str(current_prompt)
                next_prompt_out = str(next_prompt)
                from_index = int(current_keyframe)
                to_index = int(next_keyframe)
            except ValueError:
                print(f'[Warning] CR Simple Text Scheduler. Invalid keyframe at frame {current_frame}')
            if from_index == to_index:
                weight_out = 1.0
            else:
                weight_out = (to_index - current_frame) / (to_index - from_index)
            show_help = 'https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Scheduler-Nodes#cr-simple-prompt-scheduler'
            return (current_prompt_out, next_prompt_out, weight_out, show_help)
```