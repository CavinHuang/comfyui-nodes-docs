# PlaySound 🐍
## Documentation
- Class name: PlaySound|pysssss
- Category: utils
- Output node: True
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

PlaySound节点用于播放具有可自定义设置（如音量和播放模式）的音频文件。它抽象了音频播放的复杂性，提供了一个简单的界面，用于在工作流程中触发音效或通知。

## Input types
### Required
- any
    - 作为通配符输入，允许与各种数据类型或结构灵活集成，而不强制执行特定格式。
    - Comfy dtype: *
    - Python dtype: AnyType
- mode
    - 决定播放条件，可以是总是播放声音或仅在队列为空时播放，从而控制声音的发生。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- volume
    - 控制音频音量，范围从0到1，允许对声音级别进行精细调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- file
    - 指定要播放的音频文件，提供了一个默认选项，允许定制音效。
    - Comfy dtype: STRING
    - Python dtype: str

## Output types
- *
    - Comfy dtype: *
    - unknown
    - Python dtype: unknown
- ui
    - 返回一个UI组件结构，虽然在此上下文中，它似乎是一个没有活动元素的占位符。

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class PlaySound:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "any": (any, {}),
            "mode": (["always", "on empty queue"], {}),
            "volume": ("FLOAT", {"min": 0, "max": 1, "step": 0.1, "default": 0.5}),
            "file": ("STRING", { "default": "notify.mp3" })
        }}

    FUNCTION = "nop"
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)
    OUTPUT_NODE = True
    RETURN_TYPES = (any,)

    CATEGORY = "utils"

    def IS_CHANGED(self, **kwargs):
        return float("NaN")

    def nop(self, any, mode, volume, file):
        return {"ui": {"a": []}, "result": (any,)}