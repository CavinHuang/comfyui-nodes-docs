# Documentation
- Class name: SeargeDebugPrinter
- Category: DEBUG
- Output node: True
- Repo Ref: https://github.com/jobunk/SeargeSDXL.git

SeargeDebugPrinter节点旨在提供数据结构的详细和格式化输出，通过视觉检查数据流的内容，辅助调试过程。它强调数据内部的结构和关系，提供信息组织和处理方式的清晰度。

# Input types
## Required
- enabled
    - ‘enabled’参数对于激活调试过程至关重要。当设置为true时，它会触发节点输出数据流的结构和内容，便于对正在处理的数据进行彻底检查。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- data
    - ‘data’参数代表要检查和格式化用于调试目的的数据流。它是决定输出内容和结构的核心输入。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]
- prefix
    - ‘prefix’参数用于在每行输出的开头添加一个字符串，增强调试信息的可读性和组织性。它有助于区分不同的数据点并追踪数据的来源。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- data
    - 输出的‘data’代表原始输入的数据流，现在附带了其结构和内容的详细和格式化表示。这为进一步分析和调试提供了参考。
    - Comfy dtype: SRG_DATA_STREAM
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SeargeDebugPrinter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'enabled': ('BOOLEAN', {'default': True})}, 'optional': {'data': ('SRG_DATA_STREAM',), 'prefix': ('STRING', {'multiline': False, 'default': ''})}}
    RETURN_TYPES = ('SRG_DATA_STREAM',)
    RETURN_NAMES = ('data',)
    FUNCTION = 'output'
    OUTPUT_NODE = True
    CATEGORY = UI.CATEGORY_DEBUG

    def output(self, enabled, data=None, prefix=None):
        if data is None or not enabled:
            return (data,)
        prefix = '' if prefix is None or len(prefix) < 1 else prefix + ': '
        indent_spaces = '· '
        test_data = False
        if test_data:
            data['test_dict'] = {'k1': 1.0, 'k2': 2, 'k3': True}
            data['test_list'] = ['l1', 2.0, 3]
            data['test_tuple'] = (1, 't2', 3.0)

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
        print(prefix + '===============================================================================')
        if not isinstance(data, dict):
            print(prefix + ' ! invalid data stream !')
        else:
            print(prefix + '* DATA STREAM *')
            print(prefix + '---------------')
            print_val('data', data)
        print(prefix + '===============================================================================')
        return (data,)
```