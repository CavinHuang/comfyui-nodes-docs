---
tags:
- DataTypeConversion
- Math
---

# Simple Eval Examples
## Documentation
- Class name: `Simple Eval Examples`
- Category: `Efficiency Nodes/Simple Eval`
- Output node: `False`

This node provides a mechanism to load and display example inputs for simple evaluation tasks, facilitating the understanding and testing of evaluation functionalities within the system.
## Input types
### Required
- **`models_text`**
    - Defines the default text examples for simple evaluation tasks, loaded from a file. This text aids in illustrating the usage and potential inputs for evaluation purposes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
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
