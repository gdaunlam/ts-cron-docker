enum EpicorEndpointsEnum {
  FIRST_STEP_CUSTOMER = '/Erp.BO.CustomerSvc/GetNewCustomer',
  CUSTOMER = '/Erp.BO.CustomerSvc/Update',
  CUSTOMER_PULL = '/BaqSvc/customerSF/Data',
  SHIPTOE = '/BaqSvc/DireccionEmbarqueSF/Data',
  FIRST_STEP_CONTACT = '/Erp.BO.CustCntSvc/GetNewCustCnt',
  CONTACT = '/Erp.BO.CustCntSvc/Update',
  CONTACT_PULL = '/BaqSvc/ContactCustomerSF/Data',
  PRODUCT = '/BaqSvc/ListadoPartesSF/Data',
  PLANT = '/BaqSvc/bodegasSF/Data',
  PRICE_LIST = '/Erp.BO.PriceLstSvc/PriceLsts',
  PRICE_LIST_NEW = '/BaqSvc/LIstaPreciosSellOut/Data?listaCodigo=',
  PRICE_LIST_PARTS_BEGIN = '/Erp.BO.PriceLstSvc/PriceLsts',
  PRICE_LIST_PARTS_END = '/PriceLstParts',
  QUOTE_FIRST_STEP = '/Ice.BO.UD16Svc/GetaNewUD16',
  QUOTE_LAST_STEP = '/Ice.BO.UD16Svc/Update',
  QUOTE_PULL = '/BaqSvc/ConsultaSalidaMaterialSF/Data',
}

export default EpicorEndpointsEnum;
