---
tags:
- ImageTransformation
---

# Size Selector (klinter)
## Documentation
- Class name: `SizeSelector`
- Category: `Size`
- Output node: `True`

The SizeSelector node provides a mechanism for selecting a specific size configuration (width and height) based on a predefined list of sizes. It abstracts the complexity of handling different resolution requirements by allowing users to select from a human-readable list of size options, which are then translated into the corresponding numerical width and height values.
## Input types
### Required
- **`size_selected`**
    - This parameter allows the user to select a size from a predefined list of size options. Each option corresponds to a specific resolution, and the selection determines the output width and height of the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`width`**
    - Comfy dtype: `INT`
    - The width component of the selected size configuration, expressed as an integer.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height component of the selected size configuration, expressed as an integer.
    - Python dtype: `int`
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
