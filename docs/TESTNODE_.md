# Documentation
- Class name: TESTNODE_
- Category: ♾️Mixlab/__TEST
- Output node: True
- Repo Ref: https://github.com/shadowcz007/comfyui-mixlab-nodes.git

TESTNODE_ 节点旨在分析和处理任何类型元素的列表。它利用 ListStatistics 工具来统计列表中不同数据类型的出现次数，提供数据组成的摘要。该节点还动态导入并执行来自外部模块的函数，展示了其在处理基于输入列表的各种操作方面的适应性。节点的目的是提供输入列表中存在数据类型的全面概述，并在输入数据上执行预定义的函数。

# Input types
## Required
- ANY
    - ANY 参数是一个多功能输入，它接受任何类型元素的列表。它是节点操作的基础，因为它直接影响到类型计数和随后的外部函数执行。ANY 中元素的多样性会影响节点的分析和函数执行的结果。
    - Comfy dtype: any
    - Python dtype: List[Any]

# Output types
- result
    - result 参数包含了 ListStatistics 工具执行的类型计数操作的输出。它很重要，因为它提供了输入列表中元素类型的详细说明以及它们各自的计数。这些信息对于理解输入数据的构成至关重要。
    - Comfy dtype: Dict[str, List[Any]]
    - Python dtype: Dict[str, List[Any]]
- ui
    - ui 参数是一个结构化的输出，包括数据及其类型信息。它旨在便于在用户界面中展示节点的结果。data 字段包含类型计数的结果，而 type 字段指示输入列表中第一个元素的数据类型。
    - Comfy dtype: Dict[str, Any]
    - Python dtype: Dict[str, Union[Dict[str, List[Any]], str]]

# Usage tips
- Infra type: CPU

# Source code
```
class TESTNODE_:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ANY': (any_type,)}}
    RETURN_TYPES = (any_type,)
    FUNCTION = 'run'
    CATEGORY = '♾️Mixlab/__TEST'
    OUTPUT_NODE = True
    INPUT_IS_LIST = True
    OUTPUT_IS_LIST = (True,)

    def run(self, ANY):
        list_stats = ListStatistics()
        result = list_stats.count_types(ANY)
        module_path = os.path.join(os.path.dirname(__file__), 'test.py')
        spec = importlib.util.spec_from_file_location('test', module_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        functions = getattr(module, 'run')
        functions(ANY)
        return {'ui': {'data': result, 'type': [str(type(ANY[0]))]}, 'result': (ANY,)}
```