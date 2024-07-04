
# Documentation
- Class name: Simple Eval Examples
- Category: Efficiency Nodes/Simple Eval
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Simple Eval Examples节点提供了一种加载和显示简单评估任务示例输入的机制。它旨在帮助用户理解和测试系统内的评估功能，为用户提供了实际可用的示例和参考。

# Input types
## Required
- models_text
    - models_text参数定义了简单评估任务的默认文本示例，这些示例从文件中加载。这些文本示例有助于说明评估功能的使用方法和可能的输入类型，为用户提供了直观的参考和指导。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有输出类型。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
    class TSC_EvalExamples:
        @classmethod
        def INPUT_TYPES(cls):
            filepath = os.path.join(my_dir, 'workflows', 'SimpleEval_Node_Examples.txt')
            with open(filepath, 'r') as file:
                examples = file.read()
            return {"required": {"models_text": ("STRING", {"default": examples, "multiline": True}), }, }

        RETURN_TYPES = ()
        CATEGORY = "Efficiency Nodes/Simple Eval"

```
