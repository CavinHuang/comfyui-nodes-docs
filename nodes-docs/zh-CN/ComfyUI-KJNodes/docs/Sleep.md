
# Documentation
- Class name: Sleep
- Category: KJNodes/misc
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Sleep节点用于在操作流程中引入指定时长的暂停。它允许用户通过设置分钟和秒数来精确控制延迟时间，从而在执行过程中实现预定的停顿。这个功能在需要控制处理速度、模拟真实操作间隔或等待其他资源就绪等场景中特别有用。

# Input types
## Required
- input
    - 这是一个占位输入，在延迟结束后会被原样返回。它确保了数据在节点操作过程中的连续性，不会因为暂停而中断数据流。
    - Comfy dtype: *
    - Python dtype: any
- minutes
    - 指定延迟的整数分钟数。它与秒数一起构成了总的延迟时间，为用户提供了粗粒度的时间控制。
    - Comfy dtype: INT
    - Python dtype: int
- seconds
    - 指定延迟的小数分钟数（实际上是秒数）。它与分钟数一起精确定义了总的延迟时间，允许用户进行更细粒度的时间调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- *
    - 在指定的延迟时间过后，将输入数据原封不动地返回。这个输出本质上是一个带有时间延迟的数据传递。
    - Comfy dtype: *
    - Python dtype: any


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Sleep:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "input": (any, {}),
                "minutes": ("INT", {"default": 0, "min": 0, "max": 1439}),
                "seconds": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 59.99, "step": 0.01}),
            },
        }
    RETURN_TYPES = (any,)
    FUNCTION = "sleepdelay"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
Delays the execution for the input amount of time.
"""

    def sleepdelay(self, input, minutes, seconds):
        total_seconds = minutes * 60 + seconds
        time.sleep(total_seconds)
        return input,

```
