---
tags:
- Text
---

# 📉 CR XY List
## Documentation
- Class name: `CR XY List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📉 XY Grid`
- Output node: `False`

The CR XY List node is designed to generate a pair of outputs based on the Cartesian product of two input lists, with additional functionality to prepend and append custom text to each element. It also provides annotations for the last iteration of the Cartesian product, facilitating complex list manipulations and grid-based operations.
## Input types
### Required
- **`index`**
    - The index to select a specific pair from the Cartesian product. Indexing starts from 1.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`list1`**
    - The first list to participate in the Cartesian product. Elements from this list are combined with elements from the second list to generate the output pairs.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
- **`x_prepend`**
    - Text to prepend to each element of the first list in the output pairs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`x_append`**
    - Text to append to each element of the first list in the output pairs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`x_annotation_prepend`**
    - Text to prepend to the annotation of each element of the first list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`list2`**
    - The second list to participate in the Cartesian product. It is combined with elements from the first list to generate the output pairs.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
- **`y_prepend`**
    - Text to prepend to each element of the second list in the output pairs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`y_append`**
    - Text to append to each element of the second list in the output pairs.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`y_annotation_prepend`**
    - Text to prepend to the annotation of each element of the second list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`X`**
    - Comfy dtype: `STRING`
    - The processed output from the first list after applying prepend and append operations.
    - Python dtype: `str`
- **`Y`**
    - Comfy dtype: `STRING`
    - The processed output from the second list after applying prepend and append operations.
    - Python dtype: `str`
- **`x_annotation`**
    - Comfy dtype: `STRING`
    - The annotation for all elements of the first list after the last iteration of the Cartesian product.
    - Python dtype: `str`
- **`y_annotation`**
    - Comfy dtype: `STRING`
    - The annotation for all elements of the second list after the last iteration of the Cartesian product.
    - Python dtype: `str`
- **`trigger`**
    - Comfy dtype: `BOOLEAN`
    - A boolean flag indicating if the current iteration is the last one in the Cartesian product.
    - Python dtype: `bool`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for the CR XY List node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_XYList:

    @classmethod
    def INPUT_TYPES(s):
        return {"required":{
                    "index": ("INT", {"default": 0.0, "min": 0.0, "max": 9999.0, "step": 1.0,}),
                    "list1": ("STRING", {"multiline": True, "default": "x"}), #"forceInput": True}),
                    "x_prepend": ("STRING", {"multiline": False, "default": ""}),
                    "x_append": ("STRING", {"multiline": False, "default": ""}),
                    "x_annotation_prepend": ("STRING", {"multiline": False, "default": ""}),                    
                    "list2": ("STRING", {"multiline": True, "default": "y"}),
                    "y_prepend": ("STRING", {"multiline": False, "default": ""}),
                    "y_append": ("STRING", {"multiline": False, "default": ""}),                    
                    "y_annotation_prepend": ("STRING", {"multiline": False, "default": ""}),
                    }
        }

    RETURN_TYPES = ("STRING", "STRING", "STRING", "STRING", "BOOLEAN", "STRING", )
    RETURN_NAMES = ("X", "Y", "x_annotation", "y_annotation", "trigger", "show_help", ) 
    FUNCTION = "cross_join"
    CATEGORY = icons.get("Comfyroll/XY Grid") 
    
    def cross_join(self, list1, list2, x_prepend, x_append, x_annotation_prepend,
    y_prepend, y_append, y_annotation_prepend, index):

        # Index values for all XY nodes start from 1
        index -=1
        
        trigger = False

        #listx = list1.split(",")
        #listy = list2.split(",")
        listx = re.split(r',(?=(?:[^"]*"[^"]*")*[^"]*$)', list1)
        listy = re.split(r',(?=(?:[^"]*"[^"]*")*[^"]*$)', list2)
        
        listx = [item.strip() for item in listx]
        listy = [item.strip() for item in listy]
        
        lenx = len(listx)
        leny = len(listy)
        
        grid_size = lenx * leny

        x = index % lenx
        y = int(index / lenx)
        
        x_out = x_prepend + listx[x] + x_append
        y_out = y_prepend + listy[y] + y_append

        x_ann_out = ""
        y_ann_out = ""
        
        if index + 1 == grid_size:
            x_ann_out = [x_annotation_prepend + item + ";" for item in listx]
            y_ann_out = [y_annotation_prepend + item + ";" for item in listy]
            x_ann_out = "".join([str(item) for item in x_ann_out])
            y_ann_out = "".join([str(item) for item in y_ann_out])
            trigger = True

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-list"

        return (x_out, y_out, x_ann_out, y_ann_out, trigger, show_help, )

```
