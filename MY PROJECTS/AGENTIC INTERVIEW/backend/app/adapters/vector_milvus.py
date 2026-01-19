from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection

class VectorDB:
    def __init__(self, host='127.0.0.1', port='19530', collection_name='interview_vectors'):
        connections.connect(host=host, port=port)
        self.collection_name = collection_name
        fields = [
            FieldSchema(name='id', dtype=DataType.INT64, is_primary=True, auto_id=True),
            FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, dim=384)
        ]
        schema = CollectionSchema(fields, description='Interview vectors')
        if not Collection.exists(collection_name):
            self.collection = Collection(name=collection_name, schema=schema)
        else:
            self.collection = Collection(collection_name)

    def upsert(self, key, vector):
        self.collection.insert([ [vector] ])
