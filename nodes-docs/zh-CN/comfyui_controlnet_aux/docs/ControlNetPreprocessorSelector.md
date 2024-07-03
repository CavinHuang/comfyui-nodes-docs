
# Documentation
- Class name: ControlNetPreprocessorSelector
- Category: ControlNet Preprocessors
- Output node: False

ControlNetPreprocessorSelector节点旨在为ControlNet操作选择特定的预处理器，从而根据用户输入动态调整预处理策略。

# Input types
## Required
- preprocessor
    - 指定要为操作选择的预处理器，使系统能够根据不同的预处理需求进行动态适应。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- preprocessor
    - 返回所选择的预处理器，便于在后续的ControlNet操作中应用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ControlNetPreprocessorSelector:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "preprocessor": (PREPROCESSOR_OPTIONS,),
            }
        }

    RETURN_TYPES = (PREPROCESSOR_OPTIONS,)
    RETURN_NAMES = ("preprocessor",)
    FUNCTION = "get_preprocessor"

    CATEGORY = "ControlNet Preprocessors"

    def get_preprocessor(self, preprocessor: str):
        return (preprocessor,)

```
