
# Documentation
- Class name: Model Switch (JPS)
- Category: JPS Nodes/Switches
- Output node: False

Model Switch节点旨在根据指定的选择标准动态选择多个模型输入之一。它能够灵活地整合和切换工作流程中的不同模型，从而根据所选模型生成多样化的输出。

# Input types
## Required
- select
    - 决定选择哪个模型作为输出。选择基于一个整数值，指示开关输出相应的模型。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- model_i
    - 代表一个通用的模型输入选项。根据'select'参数的值，从可用的模型输入（model_1到model_5）中选择一个作为输出。这种抽象简化了输入规范，使所有模型输入得到统一处理。
    - Comfy dtype: MODEL
    - Python dtype: object

# Output types
- model_out
    - 基于'select'参数选择的模型输出。这个输出有助于在工作流程中动态集成不同的模型。
    - Comfy dtype: MODEL
    - Python dtype: object


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Model_Switch:

    CATEGORY = 'JPS Nodes/Switches'
    RETURN_TYPES = ("MODEL",)
    RETURN_NAMES = ("model_out",)
    FUNCTION = "get_model"

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "select": ("INT", {}),
            },
            "optional": {
                "model_1": ("MODEL",),
                "model_2": ("MODEL",),
                "model_3": ("MODEL",),
                "model_4": ("MODEL",),
                "model_5": ("MODEL",),
            }
        }

    def get_model(self,select,model_1,model_2=None,model_3=None,model_4=None,model_5=None,):
        
        model_out = model_1

        if (select == 2):
            model_out = model_2
        elif (select == 3):
            model_out  = model_3
        elif (select == 4):
            model_out = model_4
        elif (select == 5):
            model_out = model_5

        return (model_out,)

```
