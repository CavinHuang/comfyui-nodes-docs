---
tags:
- Debugging
---

# Debug Printer
## Documentation
- Class name: `SeargeDebugPrinter`
- Category: `Searge/Debug`
- Output node: `True`

The SeargeDebugPrinter node is designed for debugging purposes within the ComfyUI SDXL environment, providing a mechanism to print and inspect the state of data streams. It allows for conditional output based on an enabled flag, and formats the data with optional prefixes for improved readability and organization.
## Input types
### Required
- **`enabled`**
    - Determines whether the debug output is enabled, allowing for conditional printing based on this flag.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`data`**
    - The data stream to be printed. It supports various data types and structures, enabling detailed inspection of the content.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `dict or None`
- **`prefix`**
    - An optional prefix to prepend to each line of the debug output, enhancing the clarity and context of the printed information.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Returns the original data stream, allowing for further processing or inspection after debugging.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeDebugPrinter:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "enabled": ("BOOLEAN", {"default": True},),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
                "prefix": ("STRING", {"multiline": False, "default": ""},),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM",)
    RETURN_NAMES = ("data",)
    FUNCTION = "output"

    OUTPUT_NODE = True

    CATEGORY = UI.CATEGORY_DEBUG

    def output(self, enabled, data=None, prefix=None):
        if data is None or not enabled:
            return (data,)

        prefix = "" if prefix is None or len(prefix) < 1 else prefix + ": "

        indent_spaces = "· "

        test_data = False
        if test_data:
            data["test_dict"] = {"k1": 1.0, "k2": 2, "k3": True}
            data["test_list"] = ["l1", 2.0, 3]
            data["test_tuple"] = (1, "t2", 3.0)

        def print_dict(coll, ind=0, kp='"', pk=True):
            spaces = indent_spaces * ind
            for (k, v) in coll.items():
                print_val(k, v, ind, kp, pk)

        def print_coll(coll, ind=0, kp='', pk=False):
            spaces = indent_spaces * ind
            cl = len(coll)
            for i in range(0, cl):
                v = coll[i]
                print_val(i, v, ind, kp, pk)

        def print_val(k, v, ind=0, kp='"', pk=True):
            spaces = indent_spaces * ind
            key = kp + str(k) + kp + ': ' if pk else ''

            if ind > 10:
                print(prefix + spaces + key + '<max recursion depth>')
                return

            if v is None:
                print(prefix + spaces + key + 'None,')
            elif isinstance(v, int) or isinstance(v, float):
                print(prefix + spaces + key + str(v) + ',')
            elif isinstance(v, str):
                print(prefix + spaces + key + '"' + v + '",')
            elif isinstance(v, dict):
                # dirty hack: we don't need to print the whole workflow and prompt
                if k != Names.S_MAGIC_BOX_HIDDEN:
                    print(prefix + spaces + key + '{')
                    print_dict(v, ind + 1, '"', True)
                    print(prefix + spaces + '},')
                else:
                    print(prefix + spaces + key + '{ ... printing skipped ... }')
            elif isinstance(v, list):
                print(prefix + spaces + key + '[')
                print_coll(v, ind + 1, '', True)
                print(prefix + spaces + '],')
            elif isinstance(v, tuple):
                print(prefix + spaces + key + '(')
                print_coll(v, ind + 1, '', False)
                print(prefix + spaces + '),')
            else:
                print(prefix + spaces + key + str(type(v)))

        print(prefix + "===============================================================================")
        if not isinstance(data, dict):
            print(prefix + " ! invalid data stream !")
        else:
            print(prefix + "* DATA STREAM *")
            print(prefix + "---------------")
            print_val("data", data)
        print(prefix + "===============================================================================")

        return (data,)

```
