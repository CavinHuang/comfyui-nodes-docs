
# Documentation
- Class name: Prompts Everywhere
- Category: everywhere
- Output node: True
- Repo Ref: https://github.com/Formfox/comfy-nodes

"Prompts Everywhere" 节点旨在实现正面和负面提示的灵活整合。它可以适用于多种场景，支持广泛的输入类型，且对输入的格式或内容没有严格限制。这种设计使得用户能够在各种情况下自由地运用提示，增强了节点的通用性和适应性。

# Input types
## Optional
- +ve
    - 代表正面提示，可以是任何类型和数量。这种灵活性允许用户广泛而自由地指定对操作有积极贡献的输入。
    - Comfy dtype: *
    - Python dtype: Any
- -ve
    - 代表负面提示，同样可以是任何类型和数量。这为用户提供了一种方式，可以指定在操作中应被视为负面或应被排除的输入。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
该节点没有输出类型。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnythingEverywherePrompts(Base):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{}, 
                "optional": { "+ve" : ("*", {}), "-ve" : ("*", {}), } }
    
    def func(self, **kwargs):
        return ()

```
