---
tags:
- Text
---

# 🛠️ CR XY Product
## Documentation
- Class name: `CR XY Product`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/🛠️ Utils`
- Output node: `False`

The CR XY Product node performs a Cartesian product operation on two lists of text inputs, generating a new list that combines each element of the first list with every element of the second list. This node is useful for creating combinations of different text elements, facilitating operations that require exhaustive pairing of input elements.
## Input types
### Required
- **`text_x`**
    - Represents the first list of text inputs. Each line is considered a separate element in the list, and the node combines each of these elements with every element of the second list to form the Cartesian product.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_y`**
    - Represents the second list of text inputs. Similar to 'text_x', each line is treated as a separate element, and is combined with elements from the first list to generate the Cartesian product.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`x_values`**
    - Comfy dtype: `*`
    - A list containing the first elements of each pair in the Cartesian product.
    - Python dtype: `List[str]`
- **`y_values`**
    - Comfy dtype: `*`
    - A list containing the second elements of each pair in the Cartesian product.
    - Python dtype: `List[str]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation for the CR XY Product node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_XYProduct:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "text_x": ("STRING", {"multiline": True}),              
                    "text_y": ("STRING", {"multiline": True}),
                    }
        }

    RETURN_TYPES = (any_type, any_type, "STRING", )
    RETURN_NAMES = ("x_values", "y_values", "show_help", ) 
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = "cross_join"
    CATEGORY = icons.get("Comfyroll/List/Utils") 
    
    def cross_join(self, text_x, text_y):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-xy-product"
        
        list1 = text_x.strip().split('\n')
        list2 = text_y.strip().split('\n')

        cartesian_product = list(product(list1, list2))
        x_values, y_values = zip(*cartesian_product)
        
        return (list(x_values), list(y_values), show_help, )

```
