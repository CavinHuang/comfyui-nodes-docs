
# Documentation
- Class name: SAIPrimitiveConverter
- Category: SALT/Utility/Conversion
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SAIPrimitiveConverter节点旨在实现不同基本数据类型之间的转换,可处理字符串、列表和字典等多种格式。该节点提供了一种灵活的数据类型转换解决方案,支持自定义子数据类型,并能在复杂数据结构中进行特定的索引或基于键的访问。

# Input types
## Required
- input_value
    - 待转换的原始输入值。它在决定最终输出结果中起着关键作用,因为它会根据指定的输出和子数据类型进行转换。
    - Comfy dtype: *
    - Python dtype: Union[str, list, dict, Any]
- output_type
    - 指定所需的输出数据类型,引导转换过程并决定结果的结构。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- sub_data_type
    - 可选参数,用于定义转换的子类型,进一步细化转换过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- index_or_key
    - 可选参数,允许对列表进行索引或通过键访问字典中的值,实现精确的数据提取。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- output
    - 转换后的数据,以指定的输出类型呈现,反映了应用于输入值的转换结果。
    - Comfy dtype: *
    - Python dtype: Union[list, dict, str]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAIPrimitiveConverter:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input_value": (WILDCARD,),
                "output_type": (["STRING", "INT", "FLOAT", "BOOLEAN", "LIST", "DICT"],),
            },
            "optional": {
                "sub_data_type": (["ORIGIN", "STRING", "INT", "FLOAT", "BOOLEAN"],),
                "index_or_key": ("STRING", {}),
            },
        }

    RETURN_TYPES = (WILDCARD,)
    RETURN_NAMES = ("output",)

    FUNCTION = "convert_type"
    CATEGORY = "SALT/Utility/Conversion"

    def convert_type(self, input_value, output_type, sub_data_type="STRING", index_or_key=""):

        def cast_value(value, data_type):
            try:
                if data_type == "ORIGIN":
                    return value
                if data_type == "STRING":
                    return str(value)
                elif data_type == "INT":
                    return int(float(value)) if '.' in value else int(value)
                elif data_type == "FLOAT":
                    return float(value)
                elif data_type == "BOOLEAN":
                    return bool_str(value)
                else:
                    return value
            except Exception as e:
                print(f"[WARNING] {e}")
                return value

        default_values = {
            "STRING": "",
            "INT": 0,
            "FLOAT": 0.0,
            "BOOLEAN": False,
            "LIST": [],
            "DICT": {},
        }

        def process_input_value(input_val):
            if isinstance(input_val, str):
                if ',' in input_val and not any(':' in part for part in input_val.split(',')):
                    return [cast_value(item.strip(), sub_data_type) for item in input_val.split(',')]
                elif ',' in input_val and output_type == "DICT":
                    items = {}
                    for part in input_val.split(','):
                        key, value = part.split(':', 1)
                        items[key.strip()] = cast_value(value.strip(), sub_data_type)
                    return items
                else:
                    kv_pattern = r'^(.+?)\s*[:]\s*(.+)$'
                    list_item_pattern = r'^\s*(?:-|\d+\))\s*(.+)$'
                    lines = input_val.split('\n')
                    items = {}
                    list_items = []
                    for line in lines:
                        kv_match = re.match(kv_pattern, line)
                        if kv_match:
                            key, value = kv_match.groups()
                            items[key.strip()] = cast_value(value.strip(), sub_data_type)
                        else:
                            list_item_match = re.match(list_item_pattern, line)
                            if list_item_match:
                                list_items.append(cast_value(list_item_match.group(1).strip(), sub_data_type))
                            else:
                                try:
                                    float_casted_value = cast_value(line.strip(), 'FLOAT')
                                    if float_casted_value or float_casted_value == 0.0:
                                        list_items.append(float_casted_value)
                                except ValueError:
                                    pass

                    return items if items else list_items

            elif isinstance(input_val, dict):
                return {k: cast_value(v, sub_data_type) for k, v in input_val.items()}
            elif isinstance(input_val, list):
                return [cast_value(val, sub_data_type) for val in input_val]
            else:
                return [cast_value(input_val, sub_data_type)]

        if output_type == "STRING" or (sub_data_type == "STRING" and isinstance(input_value, (list, dict))):
            if index_or_key != "":
                try:
                    if isinstance(input_value, list):
                        input_value = input_value[int(index_or_key)]
                    elif isinstance(input_value, dict):
                        input_value = input_value[index_or_key]
                    return (cast_value(input_value, sub_data_type),)
                except (ValueError, IndexError, KeyError, TypeError) as e:
                    print(f"Error: Invalid index or key '{index_or_key}'. Exception: {e}")
                    return (default_values["STRING"],)
            elif index_or_key == "" and output_type == "STRING":
                return (json.dumps(input_value, indent=4),)

        try:
            processed_input = process_input_value(input_value)
            if output_type == "LIST":
                output = processed_input if isinstance(processed_input, list) else list(processed_input.values())
            elif output_type == "DICT":
                print(processed_input)
                output = processed_input if isinstance(processed_input, str) else processed_input
            else:
                print(f"Error: Unsupported type '{output_type}' for conversion. Defaulting to LIST.")
                output = processed_input if isinstance(processed_input, list) else list(processed_input.values())
        except (ValueError, TypeError):
            print(f"Error: Conversion failed. Defaulting to base value for {output_type}.")
            output = default_values.get(output_type, [])

        return (output,)

```
