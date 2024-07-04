
# Documentation
- Class name: Anything Everywhere
- Category: everywhere
- Output node: True

这个节点旨在处理并转发任何类型的输入到指定的消息处理器，使其对各种数据类型和结构具有高度的通用性。它能同时处理多个可选输入，从而在系统内实现灵活的数据处理和通信。

# Input types
## Required

## Optional
- anything
    - 代表节点可以处理的任何可选输入。这种灵活性使得节点能够处理各种数据类型和结构，从而适应不同的使用场景。
    - Comfy dtype: *
    - Python dtype: object

# Output types
该节点没有输出类型


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnythingEverywhere(Base):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{}, 
                "optional": { "anything" : ("*", {}), },
                 "hidden": {"id":"UNIQUE_ID"} }

    def func(self, id, **kwargs):
        for key in kwargs:
            message(id, kwargs[key],)
        return ()

```
