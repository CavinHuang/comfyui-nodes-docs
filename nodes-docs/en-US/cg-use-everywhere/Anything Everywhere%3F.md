---
tags:
- DataTypeAgnostic
- Debugging
---

# Anything Everywhere?
## Documentation
- Class name: `Anything Everywhere?`
- Category: `everywhere`
- Output node: `True`

This node allows for the flexible processing of various inputs, enabling users to apply operations across a wide range of data types and structures. It is designed to accommodate any input, making it highly versatile for diverse use cases.
## Input types
### Required
### Optional
- **`anything`**
    - Accepts any type of input, providing the flexibility to handle diverse data formats and structures. This parameter is central to the node's operation, allowing for the application of operations across a wide range of inputs.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`title_regex`**
    - A string specifying a regular expression to match against titles. This parameter enables filtering and selection based on title patterns, enhancing the node's applicability to specific contexts.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`input_regex`**
    - A string specifying a regular expression to match against input data. This parameter allows for filtering and selection based on input patterns, further increasing the node's versatility.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`group_regex`**
    - A string specifying a regular expression to match against groups. This parameter facilitates filtering and selection based on group patterns, broadening the node's utility.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnythingSomewhere(Base):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{}, 
                "optional": { 
                    "anything" : ("*", {}), 
                    "title_regex" : ("STRING", {"default":".*"}),
                    "input_regex" : ("STRING", {"default":".*"}),
                    "group_regex" : ("STRING", {"default":".*"}),
                    },
                 "hidden": {"id":"UNIQUE_ID"} }

    def func(self, id, title_regex=None, input_regex=None, group_regex=None, **kwargs):
        for key in kwargs:
            message(id, kwargs[key],)
        return ()

```
