
# Documentation
- Class name: SizeSelector
- Category: Size
- Output node: True
- Repo Ref: https://github.com/klinter-com/ComfyUI

SizeSelector节点提供了一种根据预定义的尺寸列表选择特定尺寸配置（宽度和高度）的机制。它通过允许用户从人类可读的尺寸选项列表中进行选择，然后将其转换为相应的数值宽度和高度值，从而抽象了处理不同分辨率需求的复杂性。

# Input types
## Required
- size_selected
    - 该参数允许用户从预定义的尺寸选项列表中选择一个尺寸。每个选项对应一个特定的分辨率，所选择的选项决定了节点的输出宽度和高度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- width
    - 所选尺寸配置的宽度分量，以整数表示。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 所选尺寸配置的高度分量，以整数表示。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SizeSelector:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        cls.size_sizes, cls.size_dict = cls.read_sizes()
        return {
            'required': {
                'size_selected': (cls.size_sizes,), 
                
            }
        }

    RETURN_TYPES = ( "INT", "INT")
    RETURN_NAMES = ( "width", "height")
    FUNCTION = "return_res"
    OUTPUT_NODE = True
    CATEGORY = "Size"

    @classmethod
    def read_sizes(cls):
        p = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(p, 'sizes.json')
        with open(file_path, 'r') as file:
            data = json.load(file)
        size_sizes = [f"{key} - {value['name']}" for key, value in data['sizes'].items()]
        size_dict = {f"{key} - {value['name']}": value for key, value in data['sizes'].items()}
        return size_sizes, size_dict
  
    def return_res(self, size_selected):
        # Extract resolution name and dimensions using the key
        selected_info = self.size_dict[size_selected]
        width = int(selected_info["width"])
        height = int(selected_info["height"])
        name = selected_info["name"]
        return (width, height, name)

```
