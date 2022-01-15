const { Client } = require("@elastic/elasticsearch");
const esb = require('elastic-builder');
const elastic = require('elasticsearch');
const bodyParsar = require('body-parser').json();
function promises(call){
    return new Promise(function(resolve,reject){
        call(resolve,reject);
    })
}

const elasticClient = elastic.Client({
    host: '127.0.0.1:9200',
   // log: 'trace'
});
  


async function create(indexName, mapping){
    
  return promises(function(resolve) {
    elasticClient.indices
      .create({
        index: indexName,
         body:mapping
      })
      .then(
        function(resp) {
          resolve({
            statusCode: resp.trace ,
            message: "created",
          });
        },
        function(err) {
          resolve('eorr');
        }
      );
  });
}
async function erraze(indexName){
    
  return promises(function(resolve) {
    elasticClient.indices
      .delete({
        index: indexName,
      //  body:mapping
      })
      .then(
        function(resp) {
          resolve({
            statusCode: resp.trace ,
            message: "created",
          });
        },
        function(err) {
          resolve('eorr');
        }
      );
  });
}
async function indexExists(indexName) {
   
    return promises(function(resolve) {
        elasticClient.indices
          .exists({
            index: indexName,
            
          })
          .then(
            function(resp) {
              resolve({
                statusCode: resp.trace ,
                message: "created",
              });
            },
            function(err) {
              resolve('eorr');
            }
          );
      });
    }
    async function indexExists(indexName) {
   
        return promises(function(resolve) {
            elasticClient.indices
              .exists({
                index: indexName,
                
              })
              .then(
                function(resp) {
                  resolve({
                    statusCode: resp.trace ,
                    message: "created",
                  });
                },
                function(err) {
                  resolve('eorr');
                }
              );
          });
        }
// 3.  Preparing index and its mapping
async function initMapping(indexName,mapping) {
   
    return promises(function(resolve) {
        elasticClient
          .putMapping({  
            index: indexName,
            
            body: mapping
          })
          .then(
            function(resp) {
              resolve({
                statusCode: resp.trace ,
                message: "created",
              });
            },
            function(err) {
              resolve('eorr');
            }
          );
      });
    }
     // 4. Add/Update a document
     async function addDocument(indexName,  payload) {
   
        return promises(function(resolve) {
            elasticClient
            .index({
                index: indexName,
                type:"_doc",
                body: payload
                
            }).then(
                function(resp) {
                  resolve({
                   resp
                  });
                },
                function(err) {
                  resolve('eorr');
                }
              );
          });
        }
        // 5. Update a document
        async function  updateDocument(indexName, _id, payload, refresh = false) {
   
            return promises(function(resolve) {
                elasticClient
                .update({
                    index: indexName,
                    type: "_doc",
                    id: _id,
                    body: { doc: payload },
                    refresh,
                  }).then(
                    function(resp) {
                      resolve({
                        resp
                      });
                    },
                    function(err) {
                      resolve('eorr');
                    }
                  );
              });
            }
       
             // 6. Update a document by query
             async function  updateDocumentByQuery(indexName, _id, payload, refresh = false){
                return promises(function(resolve) {
                    elasticClient.indices
                    .updateByQuery({
                        index: indexName,
                        type: "_doc",
                        conflicts: "proceed",
                        body: JSON.stringify(payload),
                        refresh,
                      }).then(
                        function(resp) {
                          resolve({
                            statusCode: resp.trace ,
                            message: "created",
                          });
                        },
                        function(err) {
                          resolve('eorr');
                        }
                      );
                  });
                }
              // 7. Search
              async function  search(indexName, payload) {
                return promises(function(resolve) {
                    elasticClient
                        .search({
                            index: indexName,
                           // type: "_doc",
                            
                            body: payload,
                          }).then(
                        function(resp) {
                          resolve({
                            resp
                          });
                        },
                        function(err) {
                          resolve('eorr');
                        }
                      );
                  });
                }
                 // 8. Get a typed JSON document from the index based on its id.
             async function  get(indexName, id) {
               
                return promises(function(resolve) {
                    elasticClient
                    .get({
                        index: indexName,
                        //type: "_doc",
                        id: id,
                      }).then(
                        function(resp) {
                          resolve({
                             resp
                          });
                        },
                        function(err) {
                          resolve(err);
                        }
                      );
                  });
                }
              //9. Get  multiple documents
              async function multiGet(indexName, listIds, fieldsToReturn) {
                return promises(async function(resolve) {
                    try {
                      let response = await elasticClient.mget({
                        index: indexName,
                        type: "_doc",
                        _source: fieldsToReturn,
                        body: {
                          ids: listIds,
                        },
                      });
                      resolve(response);
                    } catch (e) {
                      resolve(e);
                    }
                  });
                }
             // 10  Delete a document from an index
                async function  deleteDocument(indexName, id) {
               
                  return promises(function(resolve) {
                      elasticClient
                      .delete({
                          index: indexName,
                          //type: "_doc",
                          id: id,
                        }).then(
                          function(resp) {
                            resolve({
                               resp
                            });
                          },
                          function(err) {
                            resolve('eorr');
                          }
                        );
                    });
                  }
   //// pagination
                  
              async function  search_data(indexName, payload) {
                return promises(function(resolve) {
                    elasticClient
                        .search({
                            index: indexName,
                           // type: "_doc",
                            scroll:"1m",
                            body: payload,
                          }).then(
                        function(resp) {
                          resolve({
                             resp
                          });
                        },
                        function(err) {
                          resolve('eorr');
                        }
                      );
                  });
                }
                async function  scrollData(nextPage) {
                  console.log("_scroll_id",nextPage);
                  return promises(function(resolve) {
                      elasticClient.scroll({
                            scrollId : nextPage,
                              scroll:'1m'
                            }).then(
                          function(resp) {
                            resolve({
                               resp
                            });
                          },
                          function(err) {
                            resolve('eorr');
                          }
                        );
                    });
                  }
         /// searching factor
                  async function fetchMatchMultipleQuery(name, name,price){
                    const requestBody = esb.requestBodySearch()
                        .query(
                          esb.boolQuery()
                            .must([
                              esb.matchQuery(
                                'Name', mukesh,
                              )
                              ])
                        )
                      
                        return client.search({index: index, body: requestBody.toJSON()})
                      }
                  
module.exports = {create,indexExists,initMapping,addDocument,updateDocument, updateDocumentByQuery,search,get, multiGet,erraze,deleteDocument,search_data,scrollData,fetchMatchMultipleQuery};
    
   