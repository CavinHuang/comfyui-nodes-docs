
# Documentation
- Class name: ScaleBatchPromptSchedule
- Category: KJNodes
- Output node: False

ScaleBatchPromptSchedule节点旨在将批处理调度表从一个帧数适配到另一个帧数，有效地缩放调度表以适应新的帧持续时间。这在修改动画或视频帧数的场景中特别有用，确保提示或操作的时间与新的帧长度保持同步。

# Input types
## Required
- input_str
    - 原始批处理调度表的字符串表示，指定关键帧及其相关值。它作为缩放到新帧数的基础。
    - Comfy dtype: STRING
    - Python dtype: str
- old_frame_count
    - 批处理调度表的原始帧数。这个值对于计算调整调度表到新帧数的缩放因子至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- new_frame_count
    - 原始调度表将被缩放到的目标帧数。这决定了调度表中关键帧的新时间和分布。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- string
    - 缩放后的批处理调度表，以字符串格式呈现，反映了针对新帧数调整后的关键帧和值。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ScaleBatchPromptSchedule:
    
    RETURN_TYPES = ("STRING",)
    FUNCTION = "scaleschedule"
    CATEGORY = "KJNodes"
    DESCRIPTION = """
Scales a batch schedule from Fizz' nodes BatchPromptSchedule
to a different frame count.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "input_str": ("STRING", {"forceInput": True,"default": "0:(0.0),\n7:(1.0),\n15:(0.0)\n"}),
                 "old_frame_count": ("INT", {"forceInput": True,"default": 1,"min": 1, "max": 4096, "step": 1}),
                 "new_frame_count": ("INT", {"forceInput": True,"default": 1,"min": 1, "max": 4096, "step": 1}),
                
        },
    } 
    
    def scaleschedule(self, old_frame_count, input_str, new_frame_count):
        print("input_str:", input_str)
        pattern = r'"(\d+)"\s*:\s*"(.*?)"(?:,|\Z)'
        frame_strings = dict(re.findall(pattern, input_str))
        
        # Calculate the scaling factor
        scaling_factor = (new_frame_count - 1) / (old_frame_count - 1)
        
        # Initialize a dictionary to store the new frame numbers and strings
        new_frame_strings = {}
        
        # Iterate over the frame numbers and strings
        for old_frame, string in frame_strings.items():
            # Calculate the new frame number
            new_frame = int(round(int(old_frame) * scaling_factor))
            
            # Store the new frame number and corresponding string
            new_frame_strings[new_frame] = string
        
        # Format the output string
        output_str = ', '.join([f'"{k}":"{v}"' for k, v in sorted(new_frame_strings.items())])
        print(output_str)
        return (output_str,)

```
