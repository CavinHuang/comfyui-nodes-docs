
# Documentation
- Class name: Anything Everywhere?
- Category: everywhere
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Anything Everywhere?节点是一个高度灵活的组件，设计用于处理各种类型的输入数据。它可以接受任何形式的输入，并对其应用操作，这使得它在各种使用场景中都具有很强的适应性。该节点的核心优势在于其通用性，能够处理多样化的数据格式和结构，为用户提供了一个强大的工具来处理复杂的数据流。

# Input types
## Optional
- anything
    - 这是节点的核心输入参数，可以接受任何类型的数据。它的灵活性使得用户能够处理各种不同的数据格式和结构，从而在多样化的应用场景中发挥作用。
    - Comfy dtype: *
    - Python dtype: Any
- title_regex
    - 这个参数接受一个字符串形式的正则表达式，用于匹配标题。它使用户能够基于标题模式进行筛选和选择，增强了节点在特定上下文中的应用能力。
    - Comfy dtype: STRING
    - Python dtype: str
- input_regex
    - 这个参数接受一个字符串形式的正则表达式，用于匹配输入数据。它允许用户基于输入模式进行筛选和选择，进一步提高了节点的多功能性。
    - Comfy dtype: STRING
    - Python dtype: str
- group_regex
    - 这个参数接受一个字符串形式的正则表达式，用于匹配组。它使用户能够基于组模式进行筛选和选择，扩大了节点的实用性范围。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
该节点没有特定的输出类型


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
